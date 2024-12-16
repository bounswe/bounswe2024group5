package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.Post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByUserId(long l);

    @Query("SELECT fp FROM Post fp " +
            "JOIN PostTag pt ON fp.id = pt.post.id " +
            "JOIN English e ON pt.english.id = e.id " +
            "WHERE e.word = :word")
    List<Post> findAllByTagWord(@Param("word") String word);

    @Query("SELECT p FROM Post p " +
            "JOIN PostTag pt ON p.id = pt.post.id " +
            "JOIN English e ON pt.english.id = e.id " +
            "JOIN User u ON p.user.id = u.id " +
            "WHERE e.word = :word AND u.username = :username")
    List<Post> findAllByTagWordAndUsername(@Param("word") String word, @Param("username") String username);

    Page<Post> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @Query("""
SELECT DISTINCT p 
FROM Post p
WHERE p.id IN (
    SELECT DISTINCT fp.id
    FROM Post fp
    JOIN PostTag pt ON fp.id = pt.post.id
    JOIN English e ON pt.english.id = e.id
    JOIN Question q ON q.word = e.word
    JOIN QuestionAnswer qa ON q.id = qa.question.id
    JOIN QuizAttempt qa2 ON qa.quizAttempt.id = qa2.id
    WHERE qa.isCorrect = false 
    AND qa2.user.id = :userId
    
    UNION
    
    SELECT DISTINCT fp2.id
    FROM Post fp2
    WHERE fp2.id NOT IN (
        SELECT DISTINCT fp3.id
        FROM Post fp3
        JOIN PostTag pt ON fp3.id = pt.post.id
        JOIN English e ON pt.english.id = e.id
        JOIN Question q ON q.word = e.word
        JOIN QuestionAnswer qa ON q.id = qa.question.id
        JOIN QuizAttempt qa2 ON qa.quizAttempt.id = qa2.id
        WHERE qa.isCorrect = false 
        AND qa2.user.id = :userId
    )
)
ORDER BY 
    CASE 
        WHEN p.id IN (
            SELECT DISTINCT fp.id
            FROM Post fp
            JOIN PostTag pt ON fp.id = pt.post.id
            JOIN English e ON pt.english.id = e.id
            JOIN Question q ON q.word = e.word
            JOIN QuestionAnswer qa ON q.id = qa.question.id
            JOIN QuizAttempt qa2 ON qa.quizAttempt.id = qa2.id
            WHERE qa.isCorrect = false 
            AND qa2.user.id = :userId
        ) THEN 1 
        ELSE 2 
    END,
    p.updatedAt DESC
""")
    Page<Post> findRelevantAndOtherPosts(@Param("userId") Long userId, Pageable pageable);

    // Convenience method
    default Page<Post> findRelevantAndOtherPosts(Long userId) {
        return findRelevantAndOtherPosts(userId, PageRequest.of(0, 100));
    }

    @Query(value = 
        "SELECT fp.* " +
        "FROM ( " +
        "    SELECT post_id, MIN(query_order) AS query_order, MAX(max_category_id) AS max_category_id " +
        "    FROM ( " +
        "        SELECT  " +
        "            post_id,  " +
        "            1 AS query_order,  " +
        "            NULL AS max_category_id " +
        "        FROM post_tags " +
        "        WHERE english_id IN ( " +
        "            SELECT DISTINCT english_id " +
        "            FROM post_tags " +
        "            WHERE post_id = :postId " +
        "        ) " +
        "        AND post_id != :postId " +
        "        UNION ALL " +
        "        SELECT  " +
        "            post_id,  " +
        "            2 AS query_order,  " +
        "            NULL AS max_category_id " +
        "        FROM post_tags " +
        "        WHERE english_id IN ( " +
        "            SELECT DISTINCT english_id " +
        "            FROM word_to_sense " +
        "            WHERE sense_id IN ( " +
        "                SELECT DISTINCT sense_id " +
        "                FROM word_to_sense " +
        "                WHERE english_id IN ( " +
        "                    SELECT DISTINCT english_id " +
        "                    FROM post_tags " +
        "                    WHERE post_id = :postId " +
        "                ) " +
        "            ) " +
        "        ) " +
        "        AND post_id != :postId " +
        "        UNION ALL " +
        "        SELECT pt2.post_id AS post_id, 3 AS query_order, MAX(t2.category_id) AS max_category_id " +
        "        FROM post_tags pt1 " +
        "        JOIN translate t1 ON pt1.english_id = t1.english_id " +
        "        JOIN translate t2 ON t1.category_id = t2.category_id " +
        "        JOIN post_tags pt2 ON t2.english_id = pt2.english_id " +
        "        WHERE pt1.post_id = :postId " +
        "        AND pt2.post_id <> :postId " +
        "        GROUP BY pt2.post_id " +
        "    ) combined " +
        "    GROUP BY post_id " +
        ") AS related_posts " +
        "LEFT JOIN forum_posts fp " +
        "ON related_posts.post_id = fp.id " +
        "ORDER BY related_posts.query_order ASC, related_posts.max_category_id DESC, related_posts.post_id DESC",
        countQuery = 
        "SELECT COUNT(*) " +
        "FROM ( " +
        "    SELECT post_id " +
        "    FROM ( " +
        "        SELECT  " +
        "            post_id,  " +
        "            1 AS query_order,  " +
        "            NULL AS max_category_id " +
        "        FROM post_tags " +
        "        WHERE english_id IN ( " +
        "            SELECT DISTINCT english_id " +
        "            FROM post_tags " +
        "            WHERE post_id = :postId " +
        "        ) " +
        "        AND post_id != :postId " +
        "        UNION ALL " +
        "        SELECT  " +
        "            post_id,  " +
        "            2 AS query_order,  " +
        "            NULL AS max_category_id " +
        "        FROM post_tags " +
        "        WHERE english_id IN ( " +
        "            SELECT DISTINCT english_id " +
        "            FROM word_to_sense " +
        "            WHERE sense_id IN ( " +
        "                SELECT DISTINCT sense_id " +
        "                FROM word_to_sense " +
        "                WHERE english_id IN ( " +
        "                    SELECT DISTINCT english_id " +
        "                    FROM post_tags " +
        "                    WHERE post_id = :postId " +
        "                ) " +
        "            ) " +
        "        ) " +
        "        AND post_id != :postId " +
        "        UNION ALL " +
        "        SELECT pt2.post_id AS post_id, 3 AS query_order, MAX(t2.category_id) AS max_category_id " +
        "        FROM post_tags pt1 " +
        "        JOIN translate t1 ON pt1.english_id = t1.english_id " +
        "        JOIN translate t2 ON t1.category_id = t2.category_id " +
        "        JOIN post_tags pt2 ON t2.english_id = pt2.english_id " +
        "        WHERE pt1.post_id = :postId " +
        "        AND pt2.post_id <> :postId " +
        "        GROUP BY pt2.post_id " +
        "    ) combined " +
        ") AS related_posts",
        nativeQuery = true
    )
    Page<Post> findRelatedPosts(@Param("postId") Long postId, Pageable pageable);

    @Query(value = 
        "SELECT fp.* " +
        "FROM ( " +
        "    SELECT post_id, MIN(priority) AS priority " +
        "    FROM ( " +
        "        SELECT post_id, 1 AS priority " +
        "        FROM post_tags " +
        "        WHERE english_id IN ( " +
        "            SELECT id " +
        "            FROM english " +
        "            WHERE word = :keyword " +
        "        ) " +
        "        UNION ALL " +
        "        SELECT id, 2 AS priority " +
        "        FROM forum_posts " +
        "        WHERE title LIKE CONCAT('%', :keyword, '%') " +
        "        UNION ALL " +
        "        SELECT id, 3 AS priority " +
        "        FROM forum_posts " +
        "        WHERE content LIKE CONCAT('%', :keyword, '%') " +
        "        UNION ALL " +
        "        SELECT post_id, 4 AS priority " +
        "        FROM post_tags " +
        "        WHERE english_id IN ( " +
        "            SELECT english_id " +
        "            FROM word_to_sense " +
        "            WHERE sense_id IN ( " +
        "                SELECT sense_id " +
        "                FROM word_to_sense " +
        "                LEFT JOIN english ON word_to_sense.english_id = english.id " +
        "                WHERE english.word = :keyword " +
        "            ) " +
        "        ) " +
        "    ) combined " +
        "    GROUP BY post_id " +
        ") search_results " +
        "LEFT JOIN forum_posts fp ON search_results.post_id = fp.id " +
        "ORDER BY " +
        "    priority ASC, " +
        "    fp.id DESC ",
        countQuery = 
        "SELECT COUNT(*) " +
        "FROM ( " +
        "    SELECT post_id " +
        "    FROM ( " +
        "        SELECT post_id, 1 AS priority " +
        "        FROM post_tags " +
        "        WHERE english_id IN ( " +
        "            SELECT id " +
        "            FROM english " +
        "            WHERE word = :keyword " +
        "        ) " +
        "        UNION ALL " +
        "        SELECT id, 2 AS priority " +
        "        FROM forum_posts " +
        "        WHERE title LIKE CONCAT('%', :keyword, '%') " +
        "        UNION ALL " +
        "        SELECT id, 3 AS priority " +
        "        FROM forum_posts " +
        "        WHERE content LIKE CONCAT('%', :keyword, '%') " +
        "        UNION ALL " +
        "        SELECT post_id, 4 AS priority " +
        "        FROM post_tags " +
        "        WHERE english_id IN ( " +
        "            SELECT english_id " +
        "            FROM word_to_sense " +
        "            WHERE sense_id IN ( " +
        "                SELECT sense_id " +
        "                FROM word_to_sense " +
        "                LEFT JOIN english ON word_to_sense.english_id = english.id " +
        "                WHERE english.word = :keyword " +
        "            ) " +
        "        ) " +
        "    ) combined " +
        "    GROUP BY post_id " +
        ") search_results",
        nativeQuery = true
    )
    Page<Post> searchPost(@Param("keyword") String keyword, Pageable pageable);


}

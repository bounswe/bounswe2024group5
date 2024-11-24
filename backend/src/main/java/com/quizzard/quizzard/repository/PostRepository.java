package com.quizzard.quizzard.repository;

import com.quizzard.quizzard.model.Post;

import org.springframework.data.domain.Page;
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

    @Query(value = 
        "SELECT fp.* " +
        "FROM ( " +
        "    SELECT post_id, query_order, max_category_id " +
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
        "        SELECT  " +
        "            post_tags.post_id,  " +
        "            3 AS query_order,  " +
        "            MAX(t1.category_id) AS max_category_id " +
        "        FROM  " +
        "            translate t1 " +
        "        LEFT JOIN  " +
        "            translate t2 ON t1.category_id = t2.category_id " +
        "        RIGHT JOIN  " +
        "            post_tags ON t2.english_id = post_tags.english_id " +
        "        WHERE  " +
        "            t1.english_id IN ( " +
        "                SELECT english_id  " +
        "                FROM post_tags  " +
        "                WHERE post_id = :postId " +
        "            ) " +
        "        AND post_tags.post_id != :postId " +
        "        GROUP BY  " +
        "            post_tags.post_id " +
        "    ) combined " +
        "    ORDER BY  " +
        "        query_order ASC, " +
        "        max_category_id DESC, " +
        "        post_id DESC " +
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
        "        SELECT  " +
        "            post_tags.post_id,  " +
        "            3 AS query_order,  " +
        "            MAX(t1.category_id) AS max_category_id " +
        "        FROM  " +
        "            translate t1 " +
        "        LEFT JOIN  " +
        "            translate t2 ON t1.category_id = t2.category_id " +
        "        RIGHT JOIN  " +
        "            post_tags ON t2.english_id = post_tags.english_id " +
        "        WHERE  " +
        "            t1.english_id IN ( " +
        "                SELECT english_id  " +
        "                FROM post_tags  " +
        "                WHERE post_id = :postId " +
        "            ) " +
        "        AND post_tags.post_id != :postId " +
        "        GROUP BY  " +
        "            post_tags.post_id " +
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

import json
# 1. install the library: pip install nltk
import nltk
# nltk.download('wordnet')
from nltk.corpus import wordnet as wn

words_to_check = ['win', 'dog', 'small', 'fast', 'happy', 'bad', 'rich', 'new', 'young', 'play']

most_common_words_in_english_according_to_polysemy = ['take', 'go', 'make', 'get', 'back', 'good', 'work', 'have', 'one', 'even', 'come', 'for', 'what', 'about', 'give', 'new']
# Polysemy is the capacity for a word to have multiple related meanings.

similarity_database = {}
definition_database = {}
for word in most_common_words_in_english_according_to_polysemy + words_to_check:
    similar_words = {}
    definition_database[word] = []
    
    for ss in wn.synsets(word):
        definition_database[word].append(ss.definition())
        for similar_word in ss.lemma_names():
            similar_word = similar_word.lower()
            if similar_word != word:
                if similar_word not in similar_words:
                    similar_words[similar_word] = 1
                else:
                    similar_words[similar_word] += 1
        for sim in ss.similar_tos():
            similar_word = sim.name().split(".")[0].lower()
            if similar_word != word:
                if similar_word not in similar_words:
                    similar_words[similar_word] = 1
                else:
                    similar_words[similar_word] += 1
        # print(f'Name: {ss.name()} and definition: {ss.definition()} \n')
        # print(f'Lemma: {ss.lemma_names()}')
        # print(f'Synonyms: {[sim.name().split(".")[0] for sim in ss.similar_tos()]}')
        # print('#####\n')

    similarity_database[word] = dict(sorted(similar_words.items(), key=lambda item: item[1], reverse=True))


K = 7   # Number of definitions and similar words to print
output = []

for word, similar_words in similarity_database.items():
    word_data = {
        "Word": word,
        "Definitions": definition_database[word][0: K],
        "Similar words": dict(list(similar_words.items())[0: K])
    }
    output.append(word_data)

# Convert the output list to JSON format and print it
json_output = json.dumps(output, indent=4)
print(json_output)

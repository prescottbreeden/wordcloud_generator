from wordcloud import WordCloud, STOPWORDS
import matplotlib.pyplot as plt

filename = "./output.txt"
f = open("output.txt", "r")
comment_words = f.read()
stopwords = set(STOPWORDS)
wordcloud = WordCloud(
    collocations=False,
    width=800, height=800,
    background_color='white',
    stopwords=stopwords,
    min_font_size=12
    ).generate(comment_words)

plt.figure(figsize = (8, 8), facecolor = None)
plt.imshow(wordcloud)
plt.axis("off")
plt.tight_layout(pad = 0)

plt.show()

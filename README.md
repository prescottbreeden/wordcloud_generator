# wordcloud_generator
scrape a folder recursively and generate a word cloud

requirements:
- node
- python
- matplotlib
- pandas
- wordcloud

1) edit the script.js file to fine tune what words are just noise and what words are meaningful to your application
2) run `node script.js`
3) run `python run.py`

note: large code bases can take 5 to 15 minutes to generate the word cloud, pro tip, take a gander at the csv output before you run the python to do some quick weeding unless you really want "var" or "const" to dwarf your domain specific words

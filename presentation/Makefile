all:
	bundle exec asciidoctor-revealjs -a revealjsdir=https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.3.0 -r asciidoctor-diagram index.adoc

pages: all
	rm -rf output/ && \
	mkdir -p output/ && \
	cp -av index.html zalando.css images/ output/ && \
	cp -av ../docker-compose output/
	cd output && \
	git init && \
	git add . && \
	git commit -am "update gh-pages" && \
	git checkout -b gh-pages && \
	git push --force git@github.com:lenalebt/docker-compose-meetup.git gh-pages

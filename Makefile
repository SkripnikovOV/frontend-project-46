install:
	npm install

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.js

lint:
	npx eslint .

test:
	npm test

clean:
	rm -rf coverage

coverage:
	
	npm test -- --coverage

build:
	npm run build
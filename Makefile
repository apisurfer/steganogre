NODE_MODULES = $(CURDIR)/node_modules
UGLIFYJS = $(NODE_MODULES)/.bin/uglifyjs
WATCHIFY = $(NODE_MODULES)/.bin/watchify
BROWSERIFY = $(NODE_MODULES)/.bin/browserify

# Build production package
production:
	@echo "Building steganography.js..."
	@$(BROWSERIFY) ./src/index.js | $(UGLIFYJS) -mc warnings=false --lint > dist/steganography.js
	@echo "Build finished."

# Build production package
development:
	@echo "Building steganography.js..."
	@$(BROWSERIFY) -d ./src/index.js -o dist/steganography.js
	@echo "Build finished."

# Watch src files and rebuild bundle while developing
watch:
	@echo "Watching nextuser source files..."
	@$(WATCHIFY) ./src/index.js -o dist/steganography.js -v


build: build-customer-service build-frontend-service build-parcel-service build-present-service

build-customer-service:
	cd customer-service && npm run build

build-frontend-service:
	cd frontend-service && npm run build

build-parcel-service:
	cd parcel-service && sbt docker:publishLocal

build-present-service:
	cd present-service && npm run build

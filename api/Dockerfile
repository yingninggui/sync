######## BUILD STAGE ########
# Release image is alpine, so use alpine in builder also for ABI compatibility
FROM golang:alpine as builder

# Build statically to use FROM scratch
ENV CGO_ENABLED=0
WORKDIR /build

# Copy only the necessary files at this stage
COPY go.mod go.sum ./
# This uses locked-down versions from go.mod and go.sum
RUN go mod download
# FInally, build
COPY . .
RUN go build

######## RELEASE STAGE ########
FROM scratch

COPY --from=builder /build/api /api

CMD ["/api"]

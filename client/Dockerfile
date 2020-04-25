FROM node:alpine AS builder

COPY . .
RUN yarn install && yarn build

FROM busybox:musl

COPY --from=builder /build /build
CMD ["httpd", "-f", "-h", "/build"]

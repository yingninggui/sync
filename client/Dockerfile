FROM node:alpine AS builder

COPY . .
RUN npm install && npm run build

FROM busybox:musl

COPY --from=builder /build /build
CMD ["httpd", "-f", "-h", "/build"]

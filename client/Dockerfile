FROM node:alpine AS builder

COPY . .
RUN yarn install && yarn build

FROM nginx:alpine

COPY --from=builder /build /build
CMD ["nginx", "-g", "daemon off;"]

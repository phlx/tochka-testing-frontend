# tochka-testing-frontend

Решение [тестового задания](https://github.com/Life1over/test-task/blob/master/php.md).  
Фронтэнд.  
Используется:
```
  "dependencies": {
    "axios": "^0.18.0",
    "element-ui": "^2.4.11",
    "lodash": "^4.17.11",
    "moment": "^2.22.2",
    "normalize.css": "^8.0.1",
    "vue": "^2.5.17",
    "vue-router": "^3.0.1",
    "vuex": "^3.0.1"
  },
```

## Конфиг nginx (для бэкенда и фронтэнда)
```
server {
    listen 80 default_server;
    listen [::]:80 default_server ipv6only=on;

    server_name localhost;
    root /var/www/tochka-testing-backend/public;
    index index.php index.html index.htm;

    location ~ ^/api {
         try_files $uri $uri/ /index.php$is_args$args;
    }

    location ~ \.php$ {
        try_files $uri /index.php =404;
        fastcgi_pass php-upstream;
        fastcgi_index index.php;
        fastcgi_buffers 16 16k;
        fastcgi_buffer_size 32k;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        #fixes timeouts
        fastcgi_read_timeout 600;
        include fastcgi_params;
    }

    location ~ ^/(.*) {
        root /var/www/tochka-testing-frontend/dist;
        try_files /$1 /index.html =404;
    }
}

```

## Установка зависимостей
```
npm install
```

### Запуск проекта для разработки
```
npm run serve
```

### Сборка проекта
```
npm run build
```

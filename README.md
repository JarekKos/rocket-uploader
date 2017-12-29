# RocketUploader

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Description

Application allows to upload, download, delete and restore images. In this case delete doesn't mean removing image from server, but changing status from 'active' to 'delete'. To decrease number of request to server, caching service was implemented.

## TODO

1) Pagination - currently pagination is implemented on server side, but not on client side, because of that maximum number of photos is equal 20.

2) Snack-bars - in case user call action, which require server operation, user should be informed that operation ends with success or with failure. Snack-bars are best way to do that.

3) Progress spinners - it's the best way to inform user that action has not end yet.






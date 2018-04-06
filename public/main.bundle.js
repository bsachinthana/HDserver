webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/account-approve/account-approve.component.html":
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<div class=\"container-fluid\">\n  <div class=\"row\">\n    <div *ngIf=\"isModalShown\" [config]=\"{ show: true }\" (onHidden)=\"onHidden()\" mdbModal #myModal=\"mdb-modal\" class=\"modal fade\"\n      tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n      <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n          <div class=\"modal-body\">\n            <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"hideModal()\">\n              <span aria-hidden=\"true\">×</span>\n            </button>\n            <img *ngIf=\"imageToShow\" [src]=\"imageToShow\" alt=\"Place image title\" class=\"img-fluid\">\n            <ng-template #noImageFound>\n              <p>no image peeps</p>\n            </ng-template>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col col-md-8\">\n      <table class=\"table table-striped\">\n        <thead>\n          <tr>\n            <th>Name</th>\n            <th>card</th>\n            <th>sno</th>\n            <th></th>\n          </tr>\n        </thead>\n        <tbody >\n          <tr *ngFor=\"let account of accounts\">\n            <td>{{account.name}}</td>\n            <td>{{account.sno}}</td>\n            <td>{{account.card}}</td>\n            <td>\n              <button type=\"button\" class=\"btn btn-sm btn-primary waves-light\" (click)=\"showModal(account.idFileName)\" mdbRippleRadius>View ID</button>\n              <button type=\"button\" class=\"btn btn-sm btn-success waves-light\" (click)=\"approveAccount(account.sno,account._id)\" mdbRippleRadius>Approve</button>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/account-approve/account-approve.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/account-approve/account-approve.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var data_service_1 = __webpack_require__("./src/app/data.service.ts");
var angular_bootstrap_md_1 = __webpack_require__("./node_modules/angular-bootstrap-md/index.ts");
var AccountApproveComponent = /** @class */ (function () {
    function AccountApproveComponent(dataService) {
        var _this = this;
        this.dataService = dataService;
        this.isModalShown = false;
        this.dataService.getPendingAccounts().subscribe(function (api_data) {
            var d = api_data;
            _this.accounts = d.data.profile;
        });
    }
    AccountApproveComponent.prototype.showModal = function (filename) {
        this.isModalShown = true;
        var path = this.getImageUrl(filename);
        this.getImageFromService(path);
    };
    AccountApproveComponent.prototype.hideModal = function () {
        this.autoShownModal.hide();
    };
    AccountApproveComponent.prototype.onHidden = function () {
        this.isModalShown = false;
    };
    AccountApproveComponent.prototype.createImageFromBlob = function (image) {
        var _this = this;
        var reader = new FileReader();
        reader.addEventListener('load', function () {
            _this.imageToShow = reader.result;
        }, false);
        if (image) {
            reader.readAsDataURL(image);
        }
    };
    AccountApproveComponent.prototype.getImageFromService = function (url) {
        var _this = this;
        this.isImageLoading = true;
        this.dataService.getImage(url).subscribe(function (data) {
            _this.createImageFromBlob(data);
            _this.isImageLoading = false;
        }, function (error) {
            _this.isImageLoading = false;
            // console.log(error);
        });
    };
    AccountApproveComponent.prototype.getImageUrl = function (name) {
        return '/api/user/id?fn=' + name;
    };
    AccountApproveComponent.prototype.approveAccount = function (sno, id) {
        this.dataService.approve(sno, id).subscribe(function (data) {
            console.log(data);
        });
    };
    AccountApproveComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.ViewChild('myModal'),
        __metadata("design:type", angular_bootstrap_md_1.ModalDirective)
    ], AccountApproveComponent.prototype, "autoShownModal", void 0);
    AccountApproveComponent = __decorate([
        core_1.Component({
            selector: 'app-account-approve',
            template: __webpack_require__("./src/app/account-approve/account-approve.component.html"),
            styles: [__webpack_require__("./src/app/account-approve/account-approve.component.scss")]
        }),
        __metadata("design:paramtypes", [data_service_1.DataService])
    ], AccountApproveComponent);
    return AccountApproveComponent;
}());
exports.AccountApproveComponent = AccountApproveComponent;


/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n  "

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var AppComponent = /** @class */ (function () {
    // constructor
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () { };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var angular_bootstrap_md_1 = __webpack_require__("./node_modules/angular-bootstrap-md/index.ts");
var ng2_file_upload_1 = __webpack_require__("./node_modules/ng2-file-upload/ng2-file-upload.js");
var app_routing_1 = __webpack_require__("./src/app/app.routing.ts");
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var data_service_1 = __webpack_require__("./src/app/data.service.ts");
var register_component_1 = __webpack_require__("./src/app/register/register.component.ts");
var login_component_1 = __webpack_require__("./src/app/login/login.component.ts");
var upload_component_1 = __webpack_require__("./src/app/upload/upload.component.ts");
var view_uploads_component_1 = __webpack_require__("./src/app/view-uploads/view-uploads.component.ts");
var jwt_interceptor_1 = __webpack_require__("./src/app/helpers/jwt.interceptor.ts");
var authguard_1 = __webpack_require__("./src/app/helpers/authguard.ts");
var navbar_component_1 = __webpack_require__("./src/app/navbar/navbar.component.ts");
var account_approve_component_1 = __webpack_require__("./src/app/account-approve/account-approve.component.ts");
var email_confirmation_component_1 = __webpack_require__("./src/app/email-confirmation/email-confirmation.component.ts");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                register_component_1.RegisterComponent,
                login_component_1.LoginComponent,
                upload_component_1.UploadComponent,
                view_uploads_component_1.ViewUploadsComponent,
                navbar_component_1.NavbarComponent,
                account_approve_component_1.AccountApproveComponent,
                email_confirmation_component_1.EmailConfirmationComponent
            ],
            imports: [
                angular_bootstrap_md_1.MDBBootstrapModule.forRoot(),
                platform_browser_1.BrowserModule,
                app_routing_1.routing,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                ng2_file_upload_1.FileUploadModule
            ],
            providers: [
                data_service_1.DataService,
                authguard_1.AuthGuard,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: jwt_interceptor_1.JwtInterceptor,
                    multi: true
                }
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/app.routing.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var register_component_1 = __webpack_require__("./src/app/register/register.component.ts");
var login_component_1 = __webpack_require__("./src/app/login/login.component.ts");
var upload_component_1 = __webpack_require__("./src/app/upload/upload.component.ts");
var view_uploads_component_1 = __webpack_require__("./src/app/view-uploads/view-uploads.component.ts");
var account_approve_component_1 = __webpack_require__("./src/app/account-approve/account-approve.component.ts");
var email_confirmation_component_1 = __webpack_require__("./src/app/email-confirmation/email-confirmation.component.ts");
var authguard_1 = __webpack_require__("./src/app/helpers/authguard.ts");
var appRoutes = [
    { path: 'user/confirmation/:id/:token', component: email_confirmation_component_1.EmailConfirmationComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'approve', component: account_approve_component_1.AccountApproveComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'upload', component: upload_component_1.UploadComponent },
    { path: 'view', component: view_uploads_component_1.ViewUploadsComponent, canActivate: [authguard_1.AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: 'view' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);


/***/ }),

/***/ "./src/app/data.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
__webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        this.prefix = '.';
    }
    DataService.prototype.approve = function (sno, id) {
        return this.http.post(this.prefix + '/api/user/approve', { 'sno': sno, 'id': id });
    };
    DataService.prototype.create = function (user) {
        return this.http.post(this.prefix + '/api/user/register', user);
    };
    DataService.prototype.login = function (cred) {
        return this.http.post(this.prefix + '/api/user/login', cred);
    };
    DataService.prototype.getSubjects = function () {
        return this.http.get('./api/util/subjects');
    };
    DataService.prototype.getUploads = function () {
        return this.http.get(this.prefix + '/api/upload');
    };
    DataService.prototype.getPendingAccounts = function () {
        return this.http.get('./api/user/pending');
    };
    DataService.prototype.getImage = function (imageUrl) {
        return this.http.get(imageUrl, { responseType: 'blob' });
    };
    DataService.prototype.getConfirmation = function (id, token) {
        return this.http.post(this.prefix + '/api/user/confirmation', { 'id': id, 'token': token });
    };
    DataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;


/***/ }),

/***/ "./src/app/email-confirmation/email-confirmation.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  Verifying your account information.. You will be redirected on success\n</p>\n"

/***/ }),

/***/ "./src/app/email-confirmation/email-confirmation.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/email-confirmation/email-confirmation.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var data_service_1 = __webpack_require__("./src/app/data.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var _1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var EmailConfirmationComponent = /** @class */ (function () {
    function EmailConfirmationComponent(dataService, route, router) {
        this.dataService = dataService;
        this.route = route;
        this.router = router;
    }
    EmailConfirmationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            _this.id = params.get('id');
            _this.token = params.get('token');
        });
        if (this.id && this.token) {
            this.dataService.getConfirmation(this.id, this.token).subscribe(function (data) {
                var d = data;
                if (d.status === 200) {
                    _this.router.navigate(['login', { landStatus: 'ACCOUNT_ACTIVATED' }]);
                }
            });
        }
    };
    EmailConfirmationComponent = __decorate([
        core_1.Component({
            selector: 'app-email-confirmation',
            template: __webpack_require__("./src/app/email-confirmation/email-confirmation.component.html"),
            styles: [__webpack_require__("./src/app/email-confirmation/email-confirmation.component.scss")]
        }),
        __metadata("design:paramtypes", [data_service_1.DataService, router_1.ActivatedRoute, _1.Router])
    ], EmailConfirmationComponent);
    return EmailConfirmationComponent;
}());
exports.EmailConfirmationComponent = EmailConfirmationComponent;


/***/ }),

/***/ "./src/app/helpers/authguard.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { landStatus: 'session_expired' } });
        return false;
    };
    AuthGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;


/***/ }),

/***/ "./src/app/helpers/jwt.interceptor.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor() {
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        // add authorization header with jwt token if available
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: "" + currentUser.token
                }
            });
        }
        return next.handle(request);
    };
    JwtInterceptor = __decorate([
        core_1.Injectable()
    ], JwtInterceptor);
    return JwtInterceptor;
}());
exports.JwtInterceptor = JwtInterceptor;


/***/ }),

/***/ "./src/app/login/login.component.css":
/***/ (function(module, exports) {

module.exports = ".container-fluid{\r\n  background: #00F260;  /* fallback for old browsers */  /* Chrome 10-25, Safari 5.1-6 */\r\n    background: -webkit-gradient(linear, left top, right top, from(#0575E6), to(#00F260));\r\n    background: linear-gradient(to right, #0575E6, #00F260); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\r\n    \r\n\r\n    /*background-image: url('../../../../images/bg.png');\r\n    background-repeat: repeat;*/\r\n}\r\n@media (min-width: 768px) {\r\n    .card{\r\n        max-width: 380px;\r\n    }\r\n}"

/***/ }),

/***/ "./src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid h-100\">\n  <div class=\"row flex-nowrap h-100 justify-content-md-center align-items-center\">\n    <div class=\"card col-12 col-md-4 z-depth-4\">\n      <p class=\"h4 text-center mb-4 mt-4\">Sign in</p>\n      <div *ngIf=\"alert!=''\" class=\"alert text-center mb-3\" [class]=\"alertClass\">\n          {{alert}}\n      </div>\n      <form (ngSubmit)=\"login()\" class=\"pl-2 pr-2\">\n        <div class=\"md-form\">\n\n          <i class=\"fa fa-user prefix\"></i>\n          <input type=\"text\" id=\"fun\" class=\"form-control\" name=\"un\" [(ngModel)]=\"cred.un\" required #sname=\"ngModel\" required mdbActive>\n          <label for=\"fun\">Registration No </label>\n          <div *ngIf=\"false\" class=\"help-block\">Username is required</div>\n\n        </div>\n        <div class=\"md-form\">\n          <i class=\"fa fa-key prefix\"></i>\n          <input type=\"password\" id=\"fpw\" class=\"form-control\" name=\"pw\" [(ngModel)]=\"cred.pw\" required #pw=\"ngModel\" required mdbActive>\n          <label for=\"fpw\">Password</label>\n          <div *ngIf=\"false\" class=\"help-block\">Username is required</div>\n        </div>\n        <div class=\"md-form\">\n          <button type=\"submit\" class=\"btn btn-primary waves-light btn-block\" mdbRippleRadius>Log in</button>\n        </div>\n      </form>\n      <div class=\"text-center\">New to file-share?\n        <a href=\"\" [routerLink]=\"['/register']\">register</a>.</div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var data_service_1 = __webpack_require__("./src/app/data.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(dataService, router, aRoute) {
        var _this = this;
        this.dataService = dataService;
        this.router = router;
        this.aRoute = aRoute;
        this.alert = '';
        this.alertClass = 'alert-danger';
        this.cred = {};
        if (localStorage.getItem('currentUser')) {
            this.router.navigate(['view']);
        }
        this.alert = '';
        aRoute.queryParams.subscribe(function (params) {
            if (params['landStatus'] == 'session_expired') {
                _this.alertClass = 'alert-danger';
                _this.alert = 'Your session has expired. Please log in to continue';
            }
            else if (params['landStatus'] === 'ACCOUNT_ACTIVATED') {
                _this.alertClass = 'alert-success';
                _this.alert = 'Your account is activated. Please log in to continue';
            }
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.alert = '';
        this.dataService.login(this.cred)
            .subscribe(function (api_data) {
            var data = api_data;
            if (data.status === 200) {
                localStorage.setItem('currentUser', JSON.stringify(data.data));
                _this.router.navigate(['view']);
            }
            else {
                if (data.message === 'USER_NOT_ACTIVE') {
                    _this.alertClass = 'alert-danger';
                    _this.alert = 'Your account is not active. Please check your mail for confirmation email';
                }
                else {
                    _this.alertClass = 'alert-danger';
                    _this.alert = data.message;
                }
            }
        }, function (error) {
            console.log(error);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            template: __webpack_require__("./src/app/login/login.component.html"),
            styles: [__webpack_require__("./src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, router_1.ActivatedRoute])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;


/***/ }),

/***/ "./src/app/navbar/navbar.component.css":
/***/ (function(module, exports) {

module.exports = ".nav-custom{\r\n    background-color: aquamarine !important;\r\n}"

/***/ }),

/***/ "./src/app/navbar/navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n  <a class=\"navbar-brand\" href=\"#\">Version 1.0</a>\n  <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarNavAltMarkup\" aria-controls=\"navbarNavAltMarkup\"\n    aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <div class=\"collapse navbar-collapse\" id=\"navbarNavAltMarkup\">\n    <ul class=\"navbar-nav\">\n      <li class=\"nav-item active\">\n        <a class=\"nav-link\" href=\"#\">Home\n          <span class=\"sr-only\">(current)</span>\n        </a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/register\">Register</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\"routerLink=\"/upload\">Uplaod</a>\n      </li>\n    </ul>\n  </div>\n  <span class=\"pr-2\">{{profile.profile.name}}</span>\n  <button class=\"nav-item\" type=\"button\" class=\"btn btn-primary my-2\" (click)=\"logout()\">Log out</button>\n</nav>\n-->\n<!--Navbar-->\n<mdb-navbar SideClass=\"navbar navbar-expand-lg teal darken-4\">\n           \n  <!-- Navbar brand -->\n  <logo><a class=\"navbar-brand\" href=\"#\">Navbar</a></logo>\n\n  <!-- Collapsible content -->\n  <links>\n\n      <!-- Links -->\n      <ul class=\"navbar-nav mr-auto\">\n          <li class=\"nav-item active white-text\">\n              <a class=\"nav-link waves-light \" mdbRippleRadius routerLink=\"/view\">Home<span class=\"sr-only\">(current)</span></a>\n          </li>\n          <li class=\"nav-item\">\n              <a class=\"nav-link waves-light white-text\" mdbRippleRadius routerLink=\"/upload\">Upload</a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link waves-light white-text\" mdbRippleRadius routerLink=\"/approve\">Approve</a>\n        </li>\n      </ul>\n      <span class=\"navbar-text white-text\">{{profile.profile.name}}</span>\n  <button class=\"btn btn-outline-success btn-sm my-0 waves-light\" type=\"button\" (click)=\"logout()\">Log out</button>\n      <!-- Links -->\n  </links>\n  <!-- Collapsible content -->\n  \n</mdb-navbar>\n<!--/.Navbar-->"

/***/ }),

/***/ "./src/app/navbar/navbar.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(router) {
        this.router = router;
        this.profile = JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.profile);
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.logout = function () {
        localStorage.removeItem('currentUser');
        this.router.navigate(['login']);
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'app-navbar',
            template: __webpack_require__("./src/app/navbar/navbar.component.html"),
            styles: [__webpack_require__("./src/app/navbar/navbar.component.css")]
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;


/***/ }),

/***/ "./src/app/register/register.component.css":
/***/ (function(module, exports) {

module.exports = ".container-fluid{\r\n    background: #67B26F;  /* fallback for old browsers */  /* Chrome 10-25, Safari 5.1-6 */\r\n    background: -webkit-gradient(linear, left top, right top, from(#4ca2cd), to(#67B26F));\r\n    background: linear-gradient(to right, #4ca2cd, #67B26F); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\r\n}\r\n\r\n.circle-icon {\r\n    background: #ffc0c0;\r\n    padding:30px;\r\n    border-radius: 50%;\r\n}"

/***/ }),

/***/ "./src/app/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid h-100 pl-5 pr-5\">\n  <div class=\"row flex-nowrap h-100 justify-content-md-center align-items-center\">\n    <div id=\"info\" class=\"card col-12 col-md-3\" *ngIf=\"visibleTab==1\">\n      <h3 class=\"h3-responsive pt-3 text-center\">Create Account</h3>\n      <form (ngSubmit)=\"register()\" class=\"pl-3 pr-3\">\n        <div class=\"md-form\">\n          <i class=\"fa fa-user prefix\"></i>\n          <input type=\"text\" id=\"fname\" class=\"form-control\" name=\"name\" [(ngModel)]=\"model.name\" required #name=\"ngModel\" mdbActive>\n          <label for=\"fname\">Name</label>\n        </div>\n        <span *ngIf=\"false\" style=\"display:block\" class=\"help-block\">Username is required</span>\n\n        <div class=\"md-form\">\n          <i class=\"fa fa-tag prefix\"></i>\n          <input type=\"text\" id=\"fcard\" class=\"form-control\" name=\"card\" [(ngModel)]=\"model.card\" required mdbActive>\n          <label for=\"fcard\">Card</label>\n        </div>\n\n        <div class=\"md-form\">\n          <i class=\"fa fa-hashtag prefix\"></i>\n          <input type=\"text\" id=\"fsno\" class=\"form-control\" name=\"sno\" [(ngModel)]=\"model.sno\" required mdbActive>\n          <label for=\"fsno\">Registration No</label>\n        </div>\n\n        <div class=\"md-form\">\n          <i class=\"fa fa-phone prefix\"></i>\n          <input type=\"text\" id=\"ftelno\" class=\"form-control\" name=\"tpno\" [(ngModel)]=\"model.tpno\" required mdbActive>\n          <label for=\"femail\">Telephone No</label>\n        </div>\n\n        <div class=\"md-form\">\n          <i class=\"fa fa-paper-plane prefix\"></i>\n          <input type=\"email\" id=\"femail\" class=\"form-control\" name=\"email\" [(ngModel)]=\"model.email\" required mdbActive>\n          <label for=\"femail\">Email</label>\n        </div>\n\n        <div class=\"md-form\">\n          <i class=\"fa fa-lock prefix\"></i>\n          <input type=\"password\" id=\"fpwrd\" class=\"form-control\" name=\"password\" [(ngModel)]=\"model.password\" required mdbActive>\n          <label for=\"fpwrd\">Password</label>\n        </div>\n\n        <div class=\"md-form\">\n          <i class=\"fa fa-lock prefix\"></i>\n          <input type=\"password\" id=\"fre-pwrd\" class=\"form-control\" name=\"confirm_password\" required mdbActive>\n          <label for=\"fre-pwrd\">Confirm Password</label>\n        </div>\n\n\n        <button type=\"submit\" class=\"btn btn-primary waves-light btn-block\" mdbRippleRadius>Sign Up</button>\n        <div class=\"text-center pt-2 pb-2\">Already have an account?\n          <a [routerLink]=\"['/login']\">Login here</a>.\n        </div>\n      </form>\n    </div>\n\n    <div id=\"file\" class=\"card col-12 col-md-3\" *ngIf=\"visibleTab==2\">\n        <h3 class=\"h3-responsive pt-3 text-center\">Upload a photo of your University Identity Card</h3>\n      <input type=\"file\" class=\"mt-4\" name=\"photo\" ng2FileSelect [uploader]=\"uploader\" />\n      <!-- button to trigger the file upload when submitted -->\n      <button type=\"button\" class=\"btn btn-success btn-s mt-4\" (click)=\"uploader.uploadAll()\" [disabled]=\"!uploader.getNotUploadedItems().length\">\n          <i class=\"fa fa-circle-o-notch fa-spin\" *ngIf=\"uploading==true\"></i>Upload\n      </button>\n      <button type=\"button\" class=\"btn btn-outline-info waves-effect mt-2 mb-4\" (click)=\"visibleTab=1\">\n          Back to Details\n        </button>\n    </div>\n    <div id=\"successMsg\" class=\"card col-12 col-md-3\" *ngIf=\"visibleTab==200\">\n      <h5 class=\"h3-responsive pt-3 text-center green-text\">You details have been successfully Recorded</h5>\n    <p>Please check your email for confirmation link and use it to activate your account. \n      <br/>click the button below to go to login page</p>\n    <button type=\"button\" class=\"btn btn-outline-success waves-effect mt-2 mb-4\" routerLink=\"/login\">\n       Login\n      </button>\n  </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/register/register.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var data_service_1 = __webpack_require__("./src/app/data.service.ts");
var ng2_file_upload_1 = __webpack_require__("./node_modules/ng2-file-upload/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        this.model = {};
        this.visibleTab = 1;
        this.uploading = false;
        this.uploader = new ng2_file_upload_1.FileUploader({
            url: './api/user/register', itemAlias: 'identityCard',
            parametersBeforeFiles: true
        });
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.uploader.onAfterAddingFile = function (file) {
            file.withCredentials = false;
        };
        // overide the onCompleteItem property of the uploader so we are
        // able to deal with the server response.
        this.uploader.onProgressItem = function (item, progress) {
            _this.uploading = true;
        };
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            _this.uploading = false;
            var data = JSON.parse(response);
            if (data.status == 200 && data.message == 'SUCCESS') {
                _this.visibleTab = 200;
            }
        };
        this.uploader.onBuildItemForm = function (item, form) {
            form.append('name', _this.model.name);
            form.append('card', _this.model.card);
            form.append('sno', _this.model.sno);
            form.append('tpno', _this.model.tpno);
            form.append('email', _this.model.email);
            form.append('password', _this.model.password);
        };
    };
    RegisterComponent.prototype.register = function () {
        console.log(this.model);
        /*this.dataService.create(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                  console.log('Registration successful');
                  this.router.navigate(['login']);
                },
                error => {
                    console.log(error);
                });*/
        this.visibleTab = 2;
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            template: __webpack_require__("./src/app/register/register.component.html"),
            styles: [__webpack_require__("./src/app/register/register.component.css")]
        }),
        __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;


/***/ }),

/***/ "./src/app/upload/upload.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/upload/upload.component.html":
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<div class=\"container\">\n  <form>\n    <div class=\"form-group\">\n      <div class=\"input-group\">\n        <div class=\"input-group-prepend\">\n          <span class=\"input-group-text\" id=\"title\">Title</span>\n        </div>\n        <input id=\"title\" type=\"text\" class=\"form-control\" [(ngModel)]=\"model.title\" name=\"title\" placeholder=\"Title\">\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <div class=\"input-group\">\n        <div class=\"input-group-prepend\">\n          <span class=\"input-group-text\" id=\"title\">Desciption</span>\n        </div>\n        <textarea class=\"form-control\" id=\"desc\" [(ngModel)]=\"model.desc\" name=\"desc\" placeholder=\"Description\"></textarea>\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <div class=\"input-group\">\n        <div class=\"input-group-prepend\">\n          <span class=\"input-group-text\" id=\"title\">Course</span>\n        </div>\n        <select class=\"form-control\" id=\"course\" [(ngModel)]=\"model.course\" name=\"course\">\n          <optgroup *ngFor=\"let subject of subjects\" label=\"{{subject._id}}\">\n          <option *ngFor=\"let course of subject.courses\" [ngValue]=\"course.id\">{{course.code}} {{course.name}}</option>\n          </optgroup>\n        </select>\n        \n      </div>\n    </div>\n    <div class=\"form-group\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <ul class=\"nav nav-tabs\" id=\"myTab\" role=\"tablist\">\n            <li class=\"nav-item\">\n              <a class=\"nav-link active\" id=\"file-tab\" data-toggle=\"tab\" href=\"#file\" role=\"tab\" aria-controls=\"File\" aria-selected=\"true\">File</a>\n            </li>\n            <li class=\"nav-item\">\n              <a class=\"nav-link\" id=\"video-tab\" data-toggle=\"tab\" href=\"#video\" role=\"tab\" aria-controls=\"video\" aria-selected=\"false\">Video</a>\n            </li>\n            <li class=\"nav-item\">\n              <a class=\"nav-link\" id=\"text-tab\" data-toggle=\"tab\" href=\"#text\" role=\"tab\" aria-controls=\"text\" aria-selected=\"false\">Text</a>\n            </li>\n          </ul>\n          <div class=\"tab-content\" id=\"myTabContent\">\n            <div class=\"tab-pane fade show active\" id=\"file\" role=\"tabpanel\" aria-labelledby=\"file-tab\">\n              <div class=\"col-md-12\">\n                  <!-- File input for the file-upload plugin, with special ng2-file-upload directive called ng2FileSelect-->\n                  <input type=\"file\" name=\"photo\" ng2FileSelect [uploader]=\"uploader\" />\n                  <!-- button to trigger the file upload when submitted -->\n                  <button type=\"button\" class=\"btn btn-success btn-s\" (click)=\"uploader.uploadAll()\" [disabled]=\"!uploader.getNotUploadedItems().length\">\n                    Upload\n                  </button>\n               </div>\n            </div>\n            <div class=\"tab-pane fade\" id=\"video\" role=\"tabpanel\" aria-labelledby=\"video-tab\">\n              <div class=\"input-group\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\" id=\"title\">link</span>\n                </div>\n                <input id=\"title\" type=\"text\" class=\"form-control\" #link name=\"link\" placeholder=\"link\">\n              </div>\n              <button type=\"button\" class=\"btn btn-success btn-s\" (click)=\"uploader.uploadAll()\">Upload</button>\n            </div>\n            <div class=\"tab-pane fade\" id=\"text\" role=\"tabpanel\" aria-labelledby=\"text-tab\">\n              <textarea class=\"form-control\" id=\"uText\" style=\"min-height:15em\" placeholder=\"Enter plain Text\"></textarea>\n              <button type=\"button\" class=\"btn btn-success btn-s\" (click)=\"uploader.uploadAll()\">Upload</button>\n            </div>\n           \n          </div>\n        </div>\n      </div>\n    </div>\n  </form>\n</div>"

/***/ }),

/***/ "./src/app/upload/upload.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var ng2_file_upload_1 = __webpack_require__("./node_modules/ng2-file-upload/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var data_service_1 = __webpack_require__("./src/app/data.service.ts");
var URL = './api/upload';
var UploadComponent = /** @class */ (function () {
    function UploadComponent(router, dataService) {
        var _this = this;
        this.router = router;
        this.dataService = dataService;
        this.subjects = {};
        this.model = {};
        // declare a property called fileuploader and assign it to an instance of a new fileUploader.
        // pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.uploader = new ng2_file_upload_1.FileUploader({
            url: URL, itemAlias: 'file',
            headers: [{ name: 'Authorization', value: "" + this.currentUser.token }],
            parametersBeforeFiles: true,
        });
        this.dataService.getSubjects().subscribe(function (data) { _this.subjects = data; console.log(_this.subjects); });
    }
    UploadComponent.prototype.ngOnInit = function () {
        var _this = this;
        // override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
        this.uploader.onAfterAddingFile = function (file) {
            file.withCredentials = false;
        };
        // overide the onCompleteItem property of the uploader so we are
        // able to deal with the server response.
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            console.log('ImageUpload:uploaded:' + status);
        };
        this.uploader.onBuildItemForm = function (item, form) {
            form.append('title', _this.model.title);
            form.append('desc', _this.model.desc);
            form.append('course', _this.model.course);
            form.append('type', 'file');
        };
    };
    UploadComponent.prototype.register = function () {
        this.router.navigate(['register']);
    };
    UploadComponent = __decorate([
        core_1.Component({
            selector: 'app-upload',
            template: __webpack_require__("./src/app/upload/upload.component.html"),
            styles: [__webpack_require__("./src/app/upload/upload.component.css")]
        }),
        __metadata("design:paramtypes", [router_1.Router, data_service_1.DataService])
    ], UploadComponent);
    return UploadComponent;
}());
exports.UploadComponent = UploadComponent;


/***/ }),

/***/ "./src/app/view-uploads/view-uploads.component.css":
/***/ (function(module, exports) {

module.exports = ".back{\r\n    background-image: url('bg.56d58312fdb2501f5a0a.png');\r\n    background-repeat: repeat;\r\n    }\r\n    .card-subtitle{\r\n        font-size: 0.9em !important;\r\n    }"

/***/ }),

/***/ "./src/app/view-uploads/view-uploads.component.html":
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<div class=\"container-fluid h-100 pt-3 back\">\n  <div class=\"row\">\n    <div class=\"col\">\n\n    </div>\n    <div class=\"col-md-8\">\n      <div class=\"card mb-3\" *ngFor=\"let file of files\">\n          <div class=\"card-header deep-orange lighten-1 white-text\">\n              Featured\n          </div>      \n        <div class=\"card-body\">\n          <div class=\"h-100 clearfix float-left pr-2\">\n            <span class=\"fa fa-file-pdf-o fa-2x\"></span>\n          </div>\n          <h4 class=\"card-title\">{{file.title}}</h4>\n          <h6 class=\"card-subtitle mb-2 text-muted\">{{file.course.subject}} > {{file.course.code}} : {{file.course.name}}</h6>\n          <p class=\"card-text\">\n            {{file.desc}}\n          </p>\n          <button type=\"button\" class=\"btn btn-elegant waves-light btn-sm float-right\" (click)=\"download(file.content)\">\n            <i class=\"fa fa-download mr-1\"></i>download</button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col\"></div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/view-uploads/view-uploads.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var data_service_1 = __webpack_require__("./src/app/data.service.ts");
var ViewUploadsComponent = /** @class */ (function () {
    function ViewUploadsComponent(dataService) {
        var _this = this;
        this.dataService = dataService;
        this.dataService.getUploads().subscribe(function (api_data) {
            var data = api_data;
            if (!(data.status === 500)) {
                _this.files = data.data;
            }
            else {
                alert(data.status);
            }
        });
    }
    ViewUploadsComponent.prototype.download = function (content) {
        var link = document.createElement('a');
        link.href = './api/file/' + content.fileId;
        link.download = content.fileName;
        link.click();
    };
    ViewUploadsComponent.prototype.ngOnInit = function () {
    };
    ViewUploadsComponent = __decorate([
        core_1.Component({
            selector: 'app-view-uploads',
            template: __webpack_require__("./src/app/view-uploads/view-uploads.component.html"),
            styles: [__webpack_require__("./src/app/view-uploads/view-uploads.component.css")]
        }),
        __metadata("design:paramtypes", [data_service_1.DataService])
    ], ViewUploadsComponent);
    return ViewUploadsComponent;
}());
exports.ViewUploadsComponent = ViewUploadsComponent;


/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("./src/app/app.module.ts");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map
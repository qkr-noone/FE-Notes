"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var person = new Person('qkr');
console.log(person.name);
// 只读属性 readonly  修改会报错
var Only = /** @class */ (function () {
    function Only(name) {
        this._name = name;
    }
    return Only;
}());
var only = new Only('qkr001');
console.log(only._name); // qkr001
// only._name = 'qkkrrr' 报错
// 抽象类
var Girl = /** @class */ (function () {
    function Girl() {
    }
    return Girl;
}());
var Waiter = /** @class */ (function (_super) {
    __extends(Waiter, _super);
    function Waiter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Waiter.prototype.skill = function () {
        console.log('is waiter');
    };
    return Waiter;
}(Girl));
var BaseTeacher = /** @class */ (function (_super) {
    __extends(BaseTeacher, _super);
    function BaseTeacher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseTeacher.prototype.skill = function () {
        console.log('is BaseTeacher');
    };
    return BaseTeacher;
}(Girl));
var seniorTeacher = /** @class */ (function (_super) {
    __extends(seniorTeacher, _super);
    function seniorTeacher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    seniorTeacher.prototype.skill = function () {
        console.log('is seniorTeacher');
    };
    return seniorTeacher;
}(Girl));

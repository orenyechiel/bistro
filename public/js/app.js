"use strict";
var app = angular.module('reserve', ['ngRoute']);

app.controller('ordersList', function ($scope, $http, $location) {

    var get = function(){
        $http.get('/orders').then(function (response){
        $scope.orders = response.data;
    }, function(err){
        console.warn(err.statusText + " " + err.status);
        })
    }
    get();
    
    $scope.submit = function(){

            var orders = {
                name: $scope.order.name,
                phone: $scope.order.phone,
                amount: $scope.order.amount,
                datetime: $scope.order.datetime
            };
        $http.post('/post', orders).then(function(){
            console.log('succses')
        }, function(err){
            console.warn(err.status + ' ' + err.statusText);
        })
        get()
    }
    
    $scope.remove = function(id) {
        $http.delete('/delete/' + id).then(function (response){
            console.log(id + ' Deleted');
        }, function(err){
            console.warn('Somthing wrong');
        })
        get()
    }
    
    $scope.edit = function(id) {
        $http.get('/editOrder/' + id).then(function (response){
            $scope.order = response.data;
        },function(err){
            console.warn('Somthing get wrong');
        })
    };
    
    $scope.update = function(){
        var order = {
                name: $scope.order.name,
                phone: $scope.order.phone,
                amount: $scope.order.amount,
                datetime: $scope.order.datetime
            };
        $http.put('/updateOrder/' + $scope.order._id, order).then(function(response){
            console.log('updating..');
        },function(){
            console.log('Check again');
        })
        get()
    }
})
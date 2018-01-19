/**
 * app.js defines modules of angular.js
 * 
 */

// SPDX-License-Identifier: Apache-2.0
'use strict';

var app = angular.module('application', []);

// Angular Controller
app.controller('appController', function($scope, appFactory) {

  $("#successDownload").hide();
  $("#errorPigDate").hide();
  $("#successCreateLotNo").hide();
  $("#errorLotNoDate").hide();
  $("#sucessCreateNewProcess").hide();
  $("#errorProcessDate").hide();
  $("#successCreateBox").hide();
  $("#errorBoxDate").hide();
  $("#successUpdateProcess").hide();
  $("#errorSummaryInfo").hide();

  $scope.downloadButechryInfoFromEkape = function() {
    //console.log($scope.issueYmd)
    if (!$scope.issueYmd) {
      alert('날짜 값을 제대로 입력해 주시기 바랍니다.')
      return;
    }

    $("#successDownload").hide();
    
    var issueYmd = $scope.issueYmd;

    appFactory.downloadButechryInfoFromEkape(issueYmd, function(data) {

      //console.log('test')
      $scope.numButcheryInfo = data;

      if ($scope.numButcheryInfo != "error") {
        $("#successDownload").show();
      } else {
        $scope.numButcheryInfo = 'error';
        $("#successDownload").show();
      }
    });
  }


  // Create angular function for traceability system
  $scope.queryPigsWithDate = function() {

    if (!$scope.queryButcheryYmdIn) {
      alert('날짜 값을 제대로 입력해 주시기 바랍니다.')
      return;
    }

    var queryDate = $scope.queryButcheryYmdIn;

    appFactory.queryPigsWithDate(queryDate, function(data) {
      //console.log('queryPigsWithDate')
      //console.log(data);
      $scope.pigsInfo = data;
    });
  }

  $scope.createLotNo = function() {
    
    if (!$scope.traceNosIn) {
      alert('값을 제대로 입력해 주시기 바랍니다.')
      return;
    }

    var traceNos = $scope.traceNosIn;
    traceNos = traceNos.replace(/\s+/g, '');

    var check= traceNos.split(',');

    if (check.length > 20) {
      alert('최대 20개까지 넣을 수 있습니다')
      return;
    }

    for (var i = 0; i < check.length; i++) {
      if (check[i].length != 17) {
        alert('이력번호(12자리)-도체번호(4자리) 입력 값이 제대로 되지 않았습니다')
        return;
      }
    }

    $("#successCreateLotNo").hide();
    
    traceNos = traceNos.replace(/,/g,'_');
    console.log(traceNos);


    appFactory.createLotNo(traceNos, function(data){
      $scope.newLotNo = data;

      if ($scope.newLotNo != "error") {
        $("#successCreateLotNo").show();
      } else {
        $("#successCreateLotNo").hide();
      }
    });
  }

  $scope.queryLotNoWithDate = function() {

    if (!$scope.lotNoDateIn) {
      alert('날짜 값을 제대로 입력해 주시기 바랍니다.')
      return;
    }
    var lotNoDateIn = $scope.lotNoDateIn;
    //console.log(lotNoDate);
    
    appFactory.queryLotNoWithDate(lotNoDateIn, function(data) {
      //console.log(data);
      $scope.allLotNos = data;
      if ($scope.allLotNos == "error" || $scope.allLotNos.length == 0) {
        $("#errorDate").show();
      } else {
        $("#errorDate").hide();
      }
    });
  }

  $scope.createNewProcess = function() {

    if (!$scope.lotNoIn) {
      alert('묶음번호를 입력해 주시기 바랍니다.')
      return;
    }

    var lotNo = $scope.lotNoIn;
    //console.log(lotNo);

    appFactory.createNewProcess(lotNo, function(data) {
      $scope.newProcessNo = data;
      if ($scope.newProcessNo != "error") {
        $("#sucessCreateNewProcess").show();
      } else {
        $("#sucessCreateNewProcess").hide();
      }
    });
  }

  $scope.createBox = function() {
    if (!$scope.lotNoBoxIn) {
      alert('묶음번호를 입력해 주시기 바랍니다.')
      return;
    }

    var lotNoBox = $scope.lotNoBoxIn;
    lotNoBox = lotNoBox.replace(/\s+/g, '');
    var lotNos = lotNoBox.replace(/,/g,'-');

    var nextCorp = $scope.nextCorpIn;

    var input = lotNos + '-' + nextCorp;

    //console.log(input);
    
    appFactory.createBox(input, function(data) {
      $scope.createBox = data.id;

      if ($scope.createBox != "error") {
        $("#successCreateBox").show();
      } else {
        $("#successCreateBox").hide();
      }
    });
  }

  $scope.queryBoxwithDate = function() {
    if (!$scope.boxDateIn) {
      alert('날짜 값을 제대로 입력해 주시기 바랍니다.')
      return;
    }
    var boxDate = $scope.boxDateIn;

    //console.log(boxDate);
    appFactory.queryBoxwithDate(boxDate, function(data) {
      //console.log(data);
      $scope.allBox = data;
    });
  }
  
  $scope.queryProcessInfoWithDate = function() {

    if (!$scope.processDateIn) {
      alert('날짜 값을 제대로 입력해 주시기 바랍니다.')
      return;
    }
    var processDate = $scope.processDateIn;

    appFactory.queryProcessInfo(processDate, function(data) {
      $scope.allProcessInfo = data;
      //console.log(data);
      if ($scope.allProcessInfo == "error" || $scope.allProcessInfo.length == 0) {
        $("#errorProcessDate").show();
      } else {
        $("#errorProcessDate").hide();
      }
    });
  }

  $scope.updateProcessInfo = function() {
    var processInfoIn = $scope.processInfoIn.key + '-' + 
                        $scope.processInfoIn.lotNo + '-' + 
                        $scope.processInfoIn.processPlaceNm + '-' + 
                        $scope.processInfoIn.processPlaceAddr + '-' +
                        $scope.processInfoIn.processPart + '-' + 
                        $scope.processInfoIn.processWeight + '-' + 
                        $scope.processInfoIn.processYmd + '-' + 
                        $scope.processInfoIn.purchasingCost + '-' + 
                        $scope.processInfoIn.sellingPrice;

    //console.log(processInfoIn);
    appFactory.updateProcessInfo(processInfoIn, function(data) {
      $scope.updateProcess = data.id;
      //console.log(data);
      if ($scope.updateProcess != "error") {
        $("#successUpdateProcess").show();
      } else {
        $("#successUpdateProcess").hide();
      }
    });
  }

  $scope.queryProcessSummary = function() {
    if (!$scope.summaryStartDateIn || !$scope.summaryEndDateIn) {
      alert('날짜 값을 제대로 입력해 주시기 바랍니다.')
      return;
    }
    var dateRangeIn = $scope.summaryStartDateIn + '-' + $scope.summaryEndDateIn;

    console.log(dateRangeIn);
    appFactory.queryProcessSummary(dateRangeIn, function(data) {
      $scope.allProcessSummary = data;
      //console.log(data);

      if ($scope.allProcessSummary == "error") {
        $("#errorSummaryInfo").show();
      } else {
        $("#errorSummaryInfo").hide();
      }
    });
  }
});

// Angular Factory
app.factory('appFactory', function($http) {
  var factory = {};

  // For traceability system
  factory.downloadButechryInfoFromEkape = function(issueYmd, callback) {
    $http.get('/download_butcheryinfo_from_ekape/'+issueYmd).success(function(output) {
      callback(output);
    });
  }

  factory.queryPigsWithDate = function(queryYmd, callback) {
    
    $http.get('/query_pigs_with_date/'+queryYmd).success(function(output) {
      callback(output)
    });
  }

  factory.createLotNo = function(traceNos, callback) {

    $http.get('/create_lot_no/'+traceNos).success(function(output) {
      callback(output)
    });
  }

  factory.queryLotNoWithDate = function(createdDate, callback) {

    $http.get('/query_lot_no_with_date/'+createdDate).success(function(output) {
      callback(output)
    });
  }

  factory.createNewProcess = function(lotNo, callback) {

    $http.get('/create_new_process/'+lotNo).success(function(output) {
      callback(output)
    });
  }

  factory.queryProcessInfo = function(processDate, callback) {

    $http.get('/query_process_info_with_date/'+processDate).success(function(output) {
      callback(output);
    });
  }

  factory.createBox = function(input, callback) {

    $http.get('/create_box/'+input).success(function(output) {
      callback(output);
    });
  }

  factory.queryBoxwithDate = function(boxDate, callback) {
    $http.get('/query_box_with_date/'+boxDate).success(function(output) {
      callback(output);
    })
  }

  factory.updateProcessInfo = function(processInfoIn, callback) {
    $http.get('/update_process_info/'+processInfoIn).success(function(output) {
      callback(output);
    });
  }

  factory.queryProcessSummary = function(dateRange, callback) {
    $http.get('/query_process_summary/'+dateRange).success(function(output) {
      callback(output);
    })
  }

  return factory;
});

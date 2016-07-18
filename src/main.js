'use strict';

var RollingSpider = require('rolling-spider');
var temporal = require('temporal');
var rollingSpider = new RollingSpider();

var output = document.getElementById('output');
var errorOutput = document.getElementById('errorOutput');

function displayError(error){
  console.log(error);
  errorOutput.innerHTML = 'error: ' + error;
}



document.getElementById("scanBtn").addEventListener("click", function( event ) {
  try{
    rollingSpider.connect({namePrefix: document.getElementById('namePrefix').value}, function () {
      rollingSpider.setup(function () {
        rollingSpider.flatTrim();
        rollingSpider.startPing();
        rollingSpider.flatTrim();

        temporal.queue([
          {
            delay: 3000,
            task: function () {
              rollingSpider.takeOff();
              rollingSpider.flatTrim();
            }
          },
          {
            delay: 2000,
            task: function () {
              rollingSpider.forward();
            }
          },
          {
            delay: 3000,
            task: function () {
              rollingSpider.land();
            }
          },
          {
            delay: 5000,
            task: function () {
              temporal.clear();
              console.log('done', rollingSpider);
            }
          }
        ]);
      });
    });
  }catch(error){ displayError(error); }
}, false);

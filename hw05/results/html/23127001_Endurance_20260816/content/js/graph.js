/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 130.0, "series": [{"data": [[0.0, 1.0], [0.1, 2.0], [0.2, 2.0], [0.3, 2.0], [0.4, 2.0], [0.5, 2.0], [0.6, 2.0], [0.7, 3.0], [0.8, 3.0], [0.9, 3.0], [1.0, 3.0], [1.1, 3.0], [1.2, 3.0], [1.3, 3.0], [1.4, 3.0], [1.5, 3.0], [1.6, 3.0], [1.7, 3.0], [1.8, 3.0], [1.9, 3.0], [2.0, 3.0], [2.1, 3.0], [2.2, 3.0], [2.3, 3.0], [2.4, 4.0], [2.5, 4.0], [2.6, 4.0], [2.7, 4.0], [2.8, 4.0], [2.9, 4.0], [3.0, 4.0], [3.1, 4.0], [3.2, 4.0], [3.3, 4.0], [3.4, 4.0], [3.5, 4.0], [3.6, 4.0], [3.7, 4.0], [3.8, 4.0], [3.9, 4.0], [4.0, 4.0], [4.1, 4.0], [4.2, 4.0], [4.3, 4.0], [4.4, 4.0], [4.5, 4.0], [4.6, 4.0], [4.7, 4.0], [4.8, 4.0], [4.9, 4.0], [5.0, 4.0], [5.1, 4.0], [5.2, 4.0], [5.3, 4.0], [5.4, 5.0], [5.5, 5.0], [5.6, 5.0], [5.7, 5.0], [5.8, 5.0], [5.9, 5.0], [6.0, 5.0], [6.1, 5.0], [6.2, 5.0], [6.3, 5.0], [6.4, 5.0], [6.5, 5.0], [6.6, 5.0], [6.7, 5.0], [6.8, 5.0], [6.9, 5.0], [7.0, 5.0], [7.1, 5.0], [7.2, 5.0], [7.3, 5.0], [7.4, 5.0], [7.5, 5.0], [7.6, 5.0], [7.7, 5.0], [7.8, 5.0], [7.9, 5.0], [8.0, 5.0], [8.1, 5.0], [8.2, 5.0], [8.3, 5.0], [8.4, 5.0], [8.5, 5.0], [8.6, 5.0], [8.7, 5.0], [8.8, 5.0], [8.9, 5.0], [9.0, 5.0], [9.1, 5.0], [9.2, 6.0], [9.3, 6.0], [9.4, 6.0], [9.5, 6.0], [9.6, 6.0], [9.7, 6.0], [9.8, 6.0], [9.9, 6.0], [10.0, 6.0], [10.1, 6.0], [10.2, 6.0], [10.3, 6.0], [10.4, 6.0], [10.5, 6.0], [10.6, 6.0], [10.7, 6.0], [10.8, 6.0], [10.9, 6.0], [11.0, 6.0], [11.1, 6.0], [11.2, 6.0], [11.3, 6.0], [11.4, 6.0], [11.5, 6.0], [11.6, 6.0], [11.7, 6.0], [11.8, 6.0], [11.9, 6.0], [12.0, 6.0], [12.1, 6.0], [12.2, 6.0], [12.3, 6.0], [12.4, 6.0], [12.5, 6.0], [12.6, 6.0], [12.7, 6.0], [12.8, 6.0], [12.9, 6.0], [13.0, 6.0], [13.1, 6.0], [13.2, 6.0], [13.3, 6.0], [13.4, 6.0], [13.5, 6.0], [13.6, 6.0], [13.7, 6.0], [13.8, 6.0], [13.9, 7.0], [14.0, 7.0], [14.1, 7.0], [14.2, 7.0], [14.3, 7.0], [14.4, 7.0], [14.5, 7.0], [14.6, 7.0], [14.7, 7.0], [14.8, 7.0], [14.9, 7.0], [15.0, 7.0], [15.1, 7.0], [15.2, 7.0], [15.3, 7.0], [15.4, 7.0], [15.5, 7.0], [15.6, 7.0], [15.7, 7.0], [15.8, 7.0], [15.9, 7.0], [16.0, 7.0], [16.1, 7.0], [16.2, 7.0], [16.3, 7.0], [16.4, 7.0], [16.5, 7.0], [16.6, 7.0], [16.7, 7.0], [16.8, 7.0], [16.9, 7.0], [17.0, 7.0], [17.1, 7.0], [17.2, 7.0], [17.3, 7.0], [17.4, 7.0], [17.5, 7.0], [17.6, 7.0], [17.7, 7.0], [17.8, 7.0], [17.9, 8.0], [18.0, 8.0], [18.1, 8.0], [18.2, 8.0], [18.3, 8.0], [18.4, 8.0], [18.5, 8.0], [18.6, 8.0], [18.7, 8.0], [18.8, 8.0], [18.9, 8.0], [19.0, 8.0], [19.1, 8.0], [19.2, 8.0], [19.3, 8.0], [19.4, 8.0], [19.5, 8.0], [19.6, 8.0], [19.7, 8.0], [19.8, 8.0], [19.9, 8.0], [20.0, 8.0], [20.1, 8.0], [20.2, 8.0], [20.3, 8.0], [20.4, 8.0], [20.5, 8.0], [20.6, 8.0], [20.7, 8.0], [20.8, 8.0], [20.9, 8.0], [21.0, 8.0], [21.1, 8.0], [21.2, 8.0], [21.3, 8.0], [21.4, 8.0], [21.5, 8.0], [21.6, 8.0], [21.7, 8.0], [21.8, 8.0], [21.9, 8.0], [22.0, 8.0], [22.1, 9.0], [22.2, 9.0], [22.3, 9.0], [22.4, 9.0], [22.5, 9.0], [22.6, 9.0], [22.7, 9.0], [22.8, 9.0], [22.9, 9.0], [23.0, 9.0], [23.1, 9.0], [23.2, 9.0], [23.3, 9.0], [23.4, 9.0], [23.5, 9.0], [23.6, 9.0], [23.7, 9.0], [23.8, 9.0], [23.9, 9.0], [24.0, 9.0], [24.1, 9.0], [24.2, 9.0], [24.3, 9.0], [24.4, 9.0], [24.5, 9.0], [24.6, 9.0], [24.7, 9.0], [24.8, 9.0], [24.9, 9.0], [25.0, 9.0], [25.1, 9.0], [25.2, 9.0], [25.3, 9.0], [25.4, 9.0], [25.5, 9.0], [25.6, 9.0], [25.7, 9.0], [25.8, 9.0], [25.9, 9.0], [26.0, 9.0], [26.1, 9.0], [26.2, 9.0], [26.3, 9.0], [26.4, 9.0], [26.5, 9.0], [26.6, 9.0], [26.7, 10.0], [26.8, 10.0], [26.9, 10.0], [27.0, 10.0], [27.1, 10.0], [27.2, 10.0], [27.3, 10.0], [27.4, 10.0], [27.5, 10.0], [27.6, 10.0], [27.7, 10.0], [27.8, 10.0], [27.9, 10.0], [28.0, 10.0], [28.1, 10.0], [28.2, 10.0], [28.3, 10.0], [28.4, 10.0], [28.5, 10.0], [28.6, 10.0], [28.7, 10.0], [28.8, 10.0], [28.9, 10.0], [29.0, 10.0], [29.1, 10.0], [29.2, 10.0], [29.3, 10.0], [29.4, 10.0], [29.5, 10.0], [29.6, 10.0], [29.7, 10.0], [29.8, 10.0], [29.9, 10.0], [30.0, 10.0], [30.1, 10.0], [30.2, 10.0], [30.3, 10.0], [30.4, 10.0], [30.5, 10.0], [30.6, 10.0], [30.7, 10.0], [30.8, 10.0], [30.9, 10.0], [31.0, 10.0], [31.1, 11.0], [31.2, 11.0], [31.3, 11.0], [31.4, 11.0], [31.5, 11.0], [31.6, 11.0], [31.7, 11.0], [31.8, 11.0], [31.9, 11.0], [32.0, 11.0], [32.1, 11.0], [32.2, 11.0], [32.3, 11.0], [32.4, 11.0], [32.5, 11.0], [32.6, 11.0], [32.7, 11.0], [32.8, 11.0], [32.9, 11.0], [33.0, 11.0], [33.1, 11.0], [33.2, 11.0], [33.3, 11.0], [33.4, 11.0], [33.5, 11.0], [33.6, 11.0], [33.7, 11.0], [33.8, 11.0], [33.9, 11.0], [34.0, 11.0], [34.1, 11.0], [34.2, 11.0], [34.3, 11.0], [34.4, 11.0], [34.5, 11.0], [34.6, 11.0], [34.7, 11.0], [34.8, 11.0], [34.9, 11.0], [35.0, 11.0], [35.1, 11.0], [35.2, 11.0], [35.3, 11.0], [35.4, 11.0], [35.5, 12.0], [35.6, 12.0], [35.7, 12.0], [35.8, 12.0], [35.9, 12.0], [36.0, 12.0], [36.1, 12.0], [36.2, 12.0], [36.3, 12.0], [36.4, 12.0], [36.5, 12.0], [36.6, 12.0], [36.7, 12.0], [36.8, 12.0], [36.9, 12.0], [37.0, 12.0], [37.1, 12.0], [37.2, 12.0], [37.3, 12.0], [37.4, 12.0], [37.5, 12.0], [37.6, 12.0], [37.7, 12.0], [37.8, 12.0], [37.9, 12.0], [38.0, 12.0], [38.1, 12.0], [38.2, 12.0], [38.3, 12.0], [38.4, 12.0], [38.5, 12.0], [38.6, 12.0], [38.7, 12.0], [38.8, 12.0], [38.9, 12.0], [39.0, 12.0], [39.1, 12.0], [39.2, 12.0], [39.3, 12.0], [39.4, 12.0], [39.5, 12.0], [39.6, 13.0], [39.7, 13.0], [39.8, 13.0], [39.9, 13.0], [40.0, 13.0], [40.1, 13.0], [40.2, 13.0], [40.3, 13.0], [40.4, 13.0], [40.5, 13.0], [40.6, 13.0], [40.7, 13.0], [40.8, 13.0], [40.9, 13.0], [41.0, 13.0], [41.1, 13.0], [41.2, 13.0], [41.3, 13.0], [41.4, 13.0], [41.5, 13.0], [41.6, 13.0], [41.7, 13.0], [41.8, 13.0], [41.9, 13.0], [42.0, 13.0], [42.1, 13.0], [42.2, 13.0], [42.3, 13.0], [42.4, 13.0], [42.5, 13.0], [42.6, 13.0], [42.7, 13.0], [42.8, 13.0], [42.9, 13.0], [43.0, 13.0], [43.1, 13.0], [43.2, 13.0], [43.3, 13.0], [43.4, 13.0], [43.5, 13.0], [43.6, 13.0], [43.7, 13.0], [43.8, 13.0], [43.9, 13.0], [44.0, 13.0], [44.1, 13.0], [44.2, 13.0], [44.3, 13.0], [44.4, 13.0], [44.5, 14.0], [44.6, 14.0], [44.7, 14.0], [44.8, 14.0], [44.9, 14.0], [45.0, 14.0], [45.1, 14.0], [45.2, 14.0], [45.3, 14.0], [45.4, 14.0], [45.5, 14.0], [45.6, 14.0], [45.7, 14.0], [45.8, 14.0], [45.9, 14.0], [46.0, 14.0], [46.1, 14.0], [46.2, 14.0], [46.3, 14.0], [46.4, 14.0], [46.5, 14.0], [46.6, 14.0], [46.7, 14.0], [46.8, 14.0], [46.9, 14.0], [47.0, 14.0], [47.1, 14.0], [47.2, 14.0], [47.3, 14.0], [47.4, 14.0], [47.5, 14.0], [47.6, 14.0], [47.7, 14.0], [47.8, 14.0], [47.9, 14.0], [48.0, 14.0], [48.1, 14.0], [48.2, 14.0], [48.3, 14.0], [48.4, 14.0], [48.5, 14.0], [48.6, 14.0], [48.7, 14.0], [48.8, 14.0], [48.9, 14.0], [49.0, 14.0], [49.1, 14.0], [49.2, 15.0], [49.3, 15.0], [49.4, 15.0], [49.5, 15.0], [49.6, 15.0], [49.7, 15.0], [49.8, 15.0], [49.9, 15.0], [50.0, 15.0], [50.1, 15.0], [50.2, 15.0], [50.3, 15.0], [50.4, 15.0], [50.5, 15.0], [50.6, 15.0], [50.7, 15.0], [50.8, 15.0], [50.9, 15.0], [51.0, 15.0], [51.1, 15.0], [51.2, 15.0], [51.3, 15.0], [51.4, 15.0], [51.5, 15.0], [51.6, 15.0], [51.7, 15.0], [51.8, 15.0], [51.9, 15.0], [52.0, 15.0], [52.1, 15.0], [52.2, 15.0], [52.3, 15.0], [52.4, 15.0], [52.5, 15.0], [52.6, 15.0], [52.7, 15.0], [52.8, 15.0], [52.9, 15.0], [53.0, 15.0], [53.1, 15.0], [53.2, 15.0], [53.3, 15.0], [53.4, 15.0], [53.5, 16.0], [53.6, 16.0], [53.7, 16.0], [53.8, 16.0], [53.9, 16.0], [54.0, 16.0], [54.1, 16.0], [54.2, 16.0], [54.3, 16.0], [54.4, 16.0], [54.5, 16.0], [54.6, 16.0], [54.7, 16.0], [54.8, 16.0], [54.9, 16.0], [55.0, 16.0], [55.1, 16.0], [55.2, 16.0], [55.3, 16.0], [55.4, 16.0], [55.5, 16.0], [55.6, 16.0], [55.7, 16.0], [55.8, 16.0], [55.9, 16.0], [56.0, 16.0], [56.1, 16.0], [56.2, 16.0], [56.3, 16.0], [56.4, 16.0], [56.5, 16.0], [56.6, 16.0], [56.7, 16.0], [56.8, 16.0], [56.9, 16.0], [57.0, 16.0], [57.1, 16.0], [57.2, 17.0], [57.3, 17.0], [57.4, 17.0], [57.5, 17.0], [57.6, 17.0], [57.7, 17.0], [57.8, 17.0], [57.9, 17.0], [58.0, 17.0], [58.1, 17.0], [58.2, 17.0], [58.3, 17.0], [58.4, 17.0], [58.5, 17.0], [58.6, 17.0], [58.7, 17.0], [58.8, 17.0], [58.9, 17.0], [59.0, 17.0], [59.1, 17.0], [59.2, 17.0], [59.3, 17.0], [59.4, 17.0], [59.5, 17.0], [59.6, 17.0], [59.7, 17.0], [59.8, 17.0], [59.9, 17.0], [60.0, 17.0], [60.1, 17.0], [60.2, 17.0], [60.3, 17.0], [60.4, 17.0], [60.5, 17.0], [60.6, 17.0], [60.7, 17.0], [60.8, 17.0], [60.9, 17.0], [61.0, 18.0], [61.1, 18.0], [61.2, 18.0], [61.3, 18.0], [61.4, 18.0], [61.5, 18.0], [61.6, 18.0], [61.7, 18.0], [61.8, 18.0], [61.9, 18.0], [62.0, 18.0], [62.1, 18.0], [62.2, 18.0], [62.3, 18.0], [62.4, 18.0], [62.5, 18.0], [62.6, 18.0], [62.7, 18.0], [62.8, 18.0], [62.9, 18.0], [63.0, 18.0], [63.1, 18.0], [63.2, 18.0], [63.3, 18.0], [63.4, 18.0], [63.5, 18.0], [63.6, 18.0], [63.7, 18.0], [63.8, 18.0], [63.9, 18.0], [64.0, 18.0], [64.1, 18.0], [64.2, 18.0], [64.3, 19.0], [64.4, 19.0], [64.5, 19.0], [64.6, 19.0], [64.7, 19.0], [64.8, 19.0], [64.9, 19.0], [65.0, 19.0], [65.1, 19.0], [65.2, 19.0], [65.3, 19.0], [65.4, 19.0], [65.5, 19.0], [65.6, 19.0], [65.7, 19.0], [65.8, 19.0], [65.9, 19.0], [66.0, 19.0], [66.1, 19.0], [66.2, 19.0], [66.3, 19.0], [66.4, 19.0], [66.5, 19.0], [66.6, 19.0], [66.7, 19.0], [66.8, 19.0], [66.9, 19.0], [67.0, 19.0], [67.1, 19.0], [67.2, 19.0], [67.3, 19.0], [67.4, 19.0], [67.5, 19.0], [67.6, 19.0], [67.7, 19.0], [67.8, 19.0], [67.9, 19.0], [68.0, 19.0], [68.1, 20.0], [68.2, 20.0], [68.3, 20.0], [68.4, 20.0], [68.5, 20.0], [68.6, 20.0], [68.7, 20.0], [68.8, 20.0], [68.9, 20.0], [69.0, 20.0], [69.1, 20.0], [69.2, 20.0], [69.3, 20.0], [69.4, 20.0], [69.5, 20.0], [69.6, 20.0], [69.7, 20.0], [69.8, 20.0], [69.9, 20.0], [70.0, 20.0], [70.1, 20.0], [70.2, 20.0], [70.3, 20.0], [70.4, 20.0], [70.5, 20.0], [70.6, 20.0], [70.7, 20.0], [70.8, 20.0], [70.9, 21.0], [71.0, 21.0], [71.1, 21.0], [71.2, 21.0], [71.3, 21.0], [71.4, 21.0], [71.5, 21.0], [71.6, 21.0], [71.7, 21.0], [71.8, 21.0], [71.9, 21.0], [72.0, 21.0], [72.1, 21.0], [72.2, 21.0], [72.3, 21.0], [72.4, 21.0], [72.5, 21.0], [72.6, 21.0], [72.7, 21.0], [72.8, 21.0], [72.9, 21.0], [73.0, 21.0], [73.1, 21.0], [73.2, 21.0], [73.3, 21.0], [73.4, 21.0], [73.5, 21.0], [73.6, 22.0], [73.7, 22.0], [73.8, 22.0], [73.9, 22.0], [74.0, 22.0], [74.1, 22.0], [74.2, 22.0], [74.3, 22.0], [74.4, 22.0], [74.5, 22.0], [74.6, 22.0], [74.7, 22.0], [74.8, 22.0], [74.9, 22.0], [75.0, 22.0], [75.1, 22.0], [75.2, 22.0], [75.3, 22.0], [75.4, 22.0], [75.5, 22.0], [75.6, 22.0], [75.7, 22.0], [75.8, 23.0], [75.9, 23.0], [76.0, 23.0], [76.1, 23.0], [76.2, 23.0], [76.3, 23.0], [76.4, 23.0], [76.5, 23.0], [76.6, 23.0], [76.7, 23.0], [76.8, 23.0], [76.9, 23.0], [77.0, 23.0], [77.1, 23.0], [77.2, 23.0], [77.3, 23.0], [77.4, 23.0], [77.5, 23.0], [77.6, 23.0], [77.7, 23.0], [77.8, 24.0], [77.9, 24.0], [78.0, 24.0], [78.1, 24.0], [78.2, 24.0], [78.3, 24.0], [78.4, 24.0], [78.5, 24.0], [78.6, 24.0], [78.7, 24.0], [78.8, 24.0], [78.9, 24.0], [79.0, 24.0], [79.1, 24.0], [79.2, 24.0], [79.3, 24.0], [79.4, 24.0], [79.5, 24.0], [79.6, 24.0], [79.7, 25.0], [79.8, 25.0], [79.9, 25.0], [80.0, 25.0], [80.1, 25.0], [80.2, 25.0], [80.3, 25.0], [80.4, 25.0], [80.5, 25.0], [80.6, 25.0], [80.7, 25.0], [80.8, 25.0], [80.9, 25.0], [81.0, 25.0], [81.1, 25.0], [81.2, 25.0], [81.3, 26.0], [81.4, 26.0], [81.5, 26.0], [81.6, 26.0], [81.7, 26.0], [81.8, 26.0], [81.9, 26.0], [82.0, 26.0], [82.1, 26.0], [82.2, 26.0], [82.3, 26.0], [82.4, 26.0], [82.5, 26.0], [82.6, 26.0], [82.7, 26.0], [82.8, 26.0], [82.9, 27.0], [83.0, 27.0], [83.1, 27.0], [83.2, 27.0], [83.3, 27.0], [83.4, 27.0], [83.5, 27.0], [83.6, 27.0], [83.7, 27.0], [83.8, 27.0], [83.9, 27.0], [84.0, 27.0], [84.1, 27.0], [84.2, 28.0], [84.3, 28.0], [84.4, 28.0], [84.5, 28.0], [84.6, 28.0], [84.7, 28.0], [84.8, 28.0], [84.9, 28.0], [85.0, 28.0], [85.1, 28.0], [85.2, 28.0], [85.3, 28.0], [85.4, 28.0], [85.5, 29.0], [85.6, 29.0], [85.7, 29.0], [85.8, 29.0], [85.9, 29.0], [86.0, 29.0], [86.1, 29.0], [86.2, 29.0], [86.3, 29.0], [86.4, 29.0], [86.5, 29.0], [86.6, 30.0], [86.7, 30.0], [86.8, 30.0], [86.9, 30.0], [87.0, 30.0], [87.1, 30.0], [87.2, 30.0], [87.3, 30.0], [87.4, 30.0], [87.5, 30.0], [87.6, 30.0], [87.7, 30.0], [87.8, 31.0], [87.9, 31.0], [88.0, 31.0], [88.1, 31.0], [88.2, 31.0], [88.3, 31.0], [88.4, 31.0], [88.5, 31.0], [88.6, 31.0], [88.7, 31.0], [88.8, 32.0], [88.9, 32.0], [89.0, 32.0], [89.1, 32.0], [89.2, 32.0], [89.3, 32.0], [89.4, 32.0], [89.5, 32.0], [89.6, 32.0], [89.7, 32.0], [89.8, 33.0], [89.9, 33.0], [90.0, 33.0], [90.1, 33.0], [90.2, 33.0], [90.3, 33.0], [90.4, 33.0], [90.5, 33.0], [90.6, 33.0], [90.7, 34.0], [90.8, 34.0], [90.9, 34.0], [91.0, 34.0], [91.1, 34.0], [91.2, 34.0], [91.3, 34.0], [91.4, 34.0], [91.5, 34.0], [91.6, 35.0], [91.7, 35.0], [91.8, 35.0], [91.9, 35.0], [92.0, 35.0], [92.1, 35.0], [92.2, 35.0], [92.3, 35.0], [92.4, 35.0], [92.5, 36.0], [92.6, 36.0], [92.7, 36.0], [92.8, 36.0], [92.9, 36.0], [93.0, 36.0], [93.1, 37.0], [93.2, 37.0], [93.3, 37.0], [93.4, 37.0], [93.5, 37.0], [93.6, 37.0], [93.7, 37.0], [93.8, 38.0], [93.9, 38.0], [94.0, 38.0], [94.1, 38.0], [94.2, 38.0], [94.3, 38.0], [94.4, 39.0], [94.5, 39.0], [94.6, 39.0], [94.7, 39.0], [94.8, 39.0], [94.9, 39.0], [95.0, 40.0], [95.1, 40.0], [95.2, 40.0], [95.3, 40.0], [95.4, 40.0], [95.5, 40.0], [95.6, 40.0], [95.7, 41.0], [95.8, 41.0], [95.9, 41.0], [96.0, 41.0], [96.1, 41.0], [96.2, 42.0], [96.3, 42.0], [96.4, 42.0], [96.5, 42.0], [96.6, 42.0], [96.7, 42.0], [96.8, 43.0], [96.9, 43.0], [97.0, 43.0], [97.1, 43.0], [97.2, 44.0], [97.3, 44.0], [97.4, 45.0], [97.5, 45.0], [97.6, 45.0], [97.7, 45.0], [97.8, 46.0], [97.9, 46.0], [98.0, 46.0], [98.1, 47.0], [98.2, 47.0], [98.3, 48.0], [98.4, 48.0], [98.5, 49.0], [98.6, 50.0], [98.7, 50.0], [98.8, 51.0], [98.9, 52.0], [99.0, 53.0], [99.1, 54.0], [99.2, 55.0], [99.3, 56.0], [99.4, 57.0], [99.5, 59.0], [99.6, 62.0], [99.7, 65.0], [99.8, 73.0], [99.9, 81.0]], "isOverall": false, "label": "FR04-PROFILE-READ PROFILE-USER-001", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 14.0, "minX": 0.0, "maxY": 61464.0, "series": [{"data": [[0.0, 61464.0], [100.0, 14.0]], "isOverall": false, "label": "FR04-PROFILE-READ PROFILE-USER-001", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 100.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 61478.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 61478.0, "series": [{"data": [[0.0, 61478.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 4.9E-324, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 21.064220183486245, "minX": 1.78689384E12, "maxY": 80.0, "series": [{"data": [[1.78689384E12, 21.064220183486245], [1.7868945E12, 80.0], [1.7868942E12, 80.0], [1.7868939E12, 69.96794349361585], [1.78689408E12, 80.0], [1.78689474E12, 78.7111660486197], [1.78689444E12, 80.0], [1.78689414E12, 80.0], [1.78689432E12, 80.0], [1.78689402E12, 80.0], [1.78689468E12, 80.0], [1.78689438E12, 80.0], [1.78689456E12, 80.0], [1.78689426E12, 80.0], [1.78689396E12, 80.0], [1.78689462E12, 80.0]], "isOverall": false, "label": "Load — sustained profile reads", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78689474E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 4.3157894736842115, "minX": 1.0, "maxY": 44.0, "series": [{"data": [[2.0, 44.0], [3.0, 9.333333333333334], [4.0, 8.5], [5.0, 6.333333333333333], [6.0, 12.833333333333334], [7.0, 5.8], [8.0, 10.0], [9.0, 9.0], [10.0, 7.0], [11.0, 5.857142857142858], [12.0, 7.181818181818182], [13.0, 6.666666666666667], [14.0, 5.8], [15.0, 6.0], [16.0, 8.384615384615385], [17.0, 7.384615384615385], [18.0, 6.285714285714285], [19.0, 6.857142857142857], [20.0, 8.0625], [21.0, 7.4375], [22.0, 7.235294117647059], [23.0, 4.8125], [24.0, 6.157894736842105], [25.0, 7.4], [26.0, 4.3157894736842115], [27.0, 8.714285714285714], [28.0, 5.90909090909091], [29.0, 8.8], [31.0, 26.0], [33.0, 5.0], [32.0, 26.0], [34.0, 4.904761904761905], [35.0, 8.741935483870968], [36.0, 5.518518518518518], [37.0, 4.360000000000001], [38.0, 6.517241379310344], [39.0, 7.387096774193548], [40.0, 5.666666666666666], [41.0, 7.0357142857142865], [42.0, 10.147058823529411], [43.0, 8.142857142857142], [44.0, 11.235294117647062], [45.0, 8.838709677419352], [46.0, 5.060606060606061], [47.0, 4.473684210526314], [48.0, 5.051282051282051], [49.0, 6.515151515151514], [50.0, 6.7105263157894735], [51.0, 7.666666666666669], [52.0, 6.476190476190476], [53.0, 6.199999999999998], [54.0, 6.476190476190476], [55.0, 7.627906976744187], [56.0, 6.720930232558139], [57.0, 6.256410256410257], [58.0, 11.804347826086959], [59.0, 6.133333333333332], [60.0, 7.595744680851064], [61.0, 7.642857142857142], [62.0, 8.170212765957448], [63.0, 5.479166666666665], [64.0, 7.458333333333335], [65.0, 6.916666666666665], [66.0, 7.0200000000000005], [67.0, 8.057692307692308], [68.0, 9.76470588235294], [69.0, 8.403846153846153], [70.0, 7.3962264150943415], [71.0, 8.142857142857142], [72.0, 8.588235294117645], [73.0, 11.549019607843135], [74.0, 15.393442622950818], [75.0, 12.199999999999998], [76.0, 10.510204081632656], [77.0, 22.444444444444443], [78.0, 7.333333333333333], [79.0, 17.11111111111111], [80.0, 17.57707223308793], [1.0, 11.0]], "isOverall": false, "label": "FR04-PROFILE-READ PROFILE-USER-001", "isController": false}, {"data": [[79.03497185985256, 17.25109795373931]], "isOverall": false, "label": "FR04-PROFILE-READ PROFILE-USER-001-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 80.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 1700.4, "minX": 1.78689384E12, "maxY": 33357.6, "series": [{"data": [[1.78689384E12, 2463.4], [1.7868945E12, 31218.133333333335], [1.7868942E12, 31210.6], [1.7868939E12, 27730.2], [1.78689408E12, 31918.733333333334], [1.78689474E12, 18283.4], [1.78689444E12, 31707.8], [1.78689414E12, 31255.8], [1.78689432E12, 31285.933333333334], [1.78689402E12, 32310.466666666667], [1.78689468E12, 31308.533333333333], [1.78689438E12, 33357.6], [1.78689456E12, 31850.933333333334], [1.78689426E12, 33327.46666666667], [1.78689396E12, 31157.866666666665], [1.78689462E12, 32747.4]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.78689384E12, 1700.4], [1.7868945E12, 21548.8], [1.7868942E12, 21543.6], [1.7868939E12, 19141.2], [1.78689408E12, 22032.4], [1.78689474E12, 12620.4], [1.78689444E12, 21886.8], [1.78689414E12, 21574.8], [1.78689432E12, 21595.6], [1.78689402E12, 22302.8], [1.78689468E12, 21611.2], [1.78689438E12, 23025.6], [1.78689456E12, 21985.6], [1.78689426E12, 23004.8], [1.78689396E12, 21507.2], [1.78689462E12, 22604.4]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78689474E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 5.5779816513761515, "minX": 1.78689384E12, "maxY": 24.60868539060654, "series": [{"data": [[1.78689384E12, 5.5779816513761515], [1.7868945E12, 20.14189189189193], [1.7868942E12, 18.951967173545768], [1.7868939E12, 13.711491442542789], [1.78689408E12, 24.60868539060654], [1.78689474E12, 15.25875566543058], [1.78689444E12, 11.659539082917576], [1.78689414E12, 19.73728609303441], [1.78689432E12, 15.58078497471709], [1.78689402E12, 20.094660760083965], [1.78689468E12, 17.57964388835418], [1.78689438E12, 9.686766034326997], [1.78689456E12, 18.467360454115394], [1.78689426E12, 18.151220614828194], [1.78689396E12, 19.642408123791125], [1.78689462E12, 15.538762364849296]], "isOverall": false, "label": "FR04-PROFILE-READ PROFILE-USER-001", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78689474E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 5.513761467889909, "minX": 1.78689384E12, "maxY": 24.604909133821113, "series": [{"data": [[1.78689384E12, 5.513761467889909], [1.7868945E12, 20.140444015444046], [1.7868942E12, 18.94979483466093], [1.7868939E12, 13.698723173050794], [1.78689408E12, 24.604909133821113], [1.78689474E12, 15.253399258343649], [1.78689444E12, 11.657400807792833], [1.78689414E12, 19.734875873704482], [1.78689432E12, 15.577173127859394], [1.78689402E12, 20.09093028678015], [1.78689468E12, 17.57651588065451], [1.78689438E12, 9.685185185185192], [1.78689456E12, 18.4631031220435], [1.78689426E12, 18.14624773960212], [1.78689396E12, 19.637330754352075], [1.78689462E12, 15.53600184034967]], "isOverall": false, "label": "FR04-PROFILE-READ PROFILE-USER-001", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78689474E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.00641482537419814, "minX": 1.78689384E12, "maxY": 0.17125382262996935, "series": [{"data": [[1.78689384E12, 0.17125382262996935], [1.7868945E12, 0.00675675675675674], [1.7868942E12, 0.011344436398744866], [1.7868939E12, 0.01521325726704706], [1.78689408E12, 0.011328770356384247], [1.78689474E12, 0.009888751545117428], [1.78689444E12, 0.00641482537419814], [1.78689414E12, 0.008676789587852498], [1.78689432E12, 0.007946063086925097], [1.78689402E12, 0.01352296572627653], [1.78689468E12, 0.006977863330125109], [1.78689438E12, 0.014001806684733503], [1.78689456E12, 0.007332071901608316], [1.78689426E12, 0.009719710669077765], [1.78689396E12, 0.018617021276595716], [1.78689462E12, 0.008051529790660211]], "isOverall": false, "label": "FR04-PROFILE-READ PROFILE-USER-001", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78689474E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.78689384E12, "maxY": 130.0, "series": [{"data": [[1.78689384E12, 44.0], [1.7868945E12, 69.0], [1.7868942E12, 69.0], [1.7868939E12, 99.0], [1.78689408E12, 92.0], [1.78689474E12, 53.0], [1.78689444E12, 50.0], [1.78689414E12, 65.0], [1.78689432E12, 37.0], [1.78689402E12, 58.0], [1.78689468E12, 66.0], [1.78689438E12, 36.0], [1.78689456E12, 68.0], [1.78689426E12, 64.0], [1.78689396E12, 130.0], [1.78689462E12, 63.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.78689384E12, 8.0], [1.7868945E12, 38.0], [1.7868942E12, 34.0], [1.7868939E12, 33.0], [1.78689408E12, 43.20000000000027], [1.78689474E12, 26.0], [1.78689444E12, 23.0], [1.78689414E12, 35.0], [1.78689432E12, 26.0], [1.78689402E12, 36.0], [1.78689468E12, 37.0], [1.78689438E12, 19.0], [1.78689456E12, 32.0], [1.78689426E12, 32.0], [1.78689396E12, 38.0], [1.78689462E12, 28.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.78689384E12, 16.71999999999997], [1.7868945E12, 57.0], [1.7868942E12, 47.6800000000012], [1.7868939E12, 62.0], [1.78689408E12, 76.61999999999989], [1.78689474E12, 42.7199999999998], [1.78689444E12, 38.899999999999636], [1.78689414E12, 51.0], [1.78689432E12, 33.0], [1.78689402E12, 49.0], [1.78689468E12, 54.0], [1.78689438E12, 29.0], [1.78689456E12, 43.0], [1.78689426E12, 48.0], [1.78689396E12, 76.0], [1.78689462E12, 47.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.78689384E12, 9.0], [1.7868945E12, 46.0], [1.7868942E12, 37.0], [1.7868939E12, 42.0], [1.78689408E12, 52.0], [1.78689474E12, 30.0], [1.78689444E12, 28.0], [1.78689414E12, 40.0], [1.78689432E12, 29.0], [1.78689402E12, 41.0], [1.78689468E12, 43.0], [1.78689438E12, 24.0], [1.78689456E12, 37.0], [1.78689426E12, 35.0], [1.78689396E12, 44.0], [1.78689462E12, 35.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.78689384E12, 2.0], [1.7868945E12, 2.0], [1.7868942E12, 2.0], [1.7868939E12, 2.0], [1.78689408E12, 2.0], [1.78689474E12, 2.0], [1.78689444E12, 1.0], [1.78689414E12, 2.0], [1.78689432E12, 2.0], [1.78689402E12, 1.0], [1.78689468E12, 2.0], [1.78689438E12, 1.0], [1.78689456E12, 2.0], [1.78689426E12, 1.0], [1.78689396E12, 1.0], [1.78689462E12, 2.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.78689384E12, 5.0], [1.7868945E12, 18.0], [1.7868942E12, 16.0], [1.7868939E12, 9.0], [1.78689408E12, 20.0], [1.78689474E12, 14.0], [1.78689444E12, 9.0], [1.78689414E12, 17.0], [1.78689432E12, 14.0], [1.78689402E12, 18.0], [1.78689468E12, 14.0], [1.78689438E12, 7.0], [1.78689456E12, 17.0], [1.78689426E12, 16.0], [1.78689396E12, 16.0], [1.78689462E12, 13.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78689474E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 4.0, "minX": 1.0, "maxY": 32.0, "series": [{"data": [[3.0, 8.0], [4.0, 6.5], [5.0, 11.0], [7.0, 6.0], [8.0, 7.0], [10.0, 5.0], [11.0, 6.0], [12.0, 14.0], [13.0, 6.0], [14.0, 32.0], [15.0, 6.0], [16.0, 4.5], [18.0, 8.0], [19.0, 6.0], [20.0, 6.0], [21.0, 14.5], [22.0, 10.5], [23.0, 5.0], [25.0, 5.0], [27.0, 5.0], [28.0, 9.5], [29.0, 21.0], [31.0, 12.0], [34.0, 5.0], [35.0, 19.0], [36.0, 5.0], [37.0, 5.0], [38.0, 4.5], [39.0, 7.0], [40.0, 11.0], [42.0, 8.0], [43.0, 7.0], [45.0, 20.0], [46.0, 4.0], [47.0, 9.0], [48.0, 8.0], [49.0, 6.5], [51.0, 5.0], [50.0, 16.0], [52.0, 8.0], [53.0, 8.0], [55.0, 16.0], [58.0, 11.0], [59.0, 6.0], [61.0, 11.0], [60.0, 19.5], [63.0, 8.0], [62.0, 17.0], [64.0, 6.0], [66.0, 11.0], [67.0, 10.0], [65.0, 17.0], [68.0, 13.0], [69.0, 14.0], [71.0, 14.0], [70.0, 13.0], [72.0, 17.0], [74.0, 16.0], [75.0, 15.0], [73.0, 14.0], [77.0, 16.0], [78.0, 11.0], [79.0, 15.0], [76.0, 11.0], [80.0, 14.0], [1.0, 24.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 80.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 4.0, "minX": 1.0, "maxY": 32.0, "series": [{"data": [[3.0, 8.0], [4.0, 6.5], [5.0, 11.0], [7.0, 6.0], [8.0, 6.5], [10.0, 5.0], [11.0, 5.0], [12.0, 14.0], [13.0, 6.0], [14.0, 32.0], [15.0, 6.0], [16.0, 4.5], [18.0, 8.0], [19.0, 6.0], [20.0, 6.0], [21.0, 14.5], [22.0, 10.5], [23.0, 5.0], [25.0, 5.0], [27.0, 5.0], [28.0, 9.5], [29.0, 21.0], [31.0, 12.0], [34.0, 5.0], [35.0, 19.0], [36.0, 5.0], [37.0, 5.0], [38.0, 4.0], [39.0, 7.0], [40.0, 11.0], [42.0, 8.0], [43.0, 7.0], [45.0, 20.0], [46.0, 4.0], [47.0, 9.0], [48.0, 8.0], [49.0, 6.5], [51.0, 5.0], [50.0, 16.0], [52.0, 8.0], [53.0, 8.0], [55.0, 16.0], [58.0, 11.0], [59.0, 6.0], [61.0, 11.0], [60.0, 19.5], [63.0, 8.0], [62.0, 17.0], [64.0, 6.0], [66.0, 11.0], [67.0, 10.0], [65.0, 17.0], [68.0, 13.0], [69.0, 14.0], [71.0, 14.0], [70.0, 13.0], [72.0, 17.0], [74.0, 16.0], [75.0, 15.0], [73.0, 14.0], [77.0, 16.0], [78.0, 11.0], [79.0, 15.0], [76.0, 11.0], [80.0, 14.0], [1.0, 24.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 80.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 5.45, "minX": 1.78689384E12, "maxY": 73.8, "series": [{"data": [[1.78689384E12, 5.45], [1.7868945E12, 69.06666666666666], [1.7868942E12, 69.05], [1.7868939E12, 61.36666666666667], [1.78689408E12, 70.61666666666666], [1.78689474E12, 40.45], [1.78689444E12, 70.15], [1.78689414E12, 69.15], [1.78689432E12, 69.21666666666667], [1.78689402E12, 71.48333333333333], [1.78689468E12, 69.26666666666667], [1.78689438E12, 73.8], [1.78689456E12, 70.46666666666667], [1.78689426E12, 73.73333333333333], [1.78689396E12, 68.91666666666667], [1.78689462E12, 72.45]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78689474E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 5.45, "minX": 1.78689384E12, "maxY": 73.8, "series": [{"data": [[1.78689384E12, 5.45], [1.7868945E12, 69.06666666666666], [1.7868942E12, 69.05], [1.7868939E12, 61.35], [1.78689408E12, 70.61666666666666], [1.78689474E12, 40.45], [1.78689444E12, 70.15], [1.78689414E12, 69.15], [1.78689432E12, 69.21666666666667], [1.78689402E12, 71.48333333333333], [1.78689468E12, 69.26666666666667], [1.78689438E12, 73.8], [1.78689456E12, 70.46666666666667], [1.78689426E12, 73.73333333333333], [1.78689396E12, 68.93333333333334], [1.78689462E12, 72.45]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.78689474E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 5.45, "minX": 1.78689384E12, "maxY": 73.8, "series": [{"data": [[1.78689384E12, 5.45], [1.7868945E12, 69.06666666666666], [1.7868942E12, 69.05], [1.7868939E12, 61.35], [1.78689408E12, 70.61666666666666], [1.78689474E12, 40.45], [1.78689444E12, 70.15], [1.78689414E12, 69.15], [1.78689432E12, 69.21666666666667], [1.78689402E12, 71.48333333333333], [1.78689468E12, 69.26666666666667], [1.78689438E12, 73.8], [1.78689456E12, 70.46666666666667], [1.78689426E12, 73.73333333333333], [1.78689396E12, 68.93333333333334], [1.78689462E12, 72.45]], "isOverall": false, "label": "FR04-PROFILE-READ PROFILE-USER-001-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78689474E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 5.45, "minX": 1.78689384E12, "maxY": 73.8, "series": [{"data": [[1.78689384E12, 5.45], [1.7868945E12, 69.06666666666666], [1.7868942E12, 69.05], [1.7868939E12, 61.35], [1.78689408E12, 70.61666666666666], [1.78689474E12, 40.45], [1.78689444E12, 70.15], [1.78689414E12, 69.15], [1.78689432E12, 69.21666666666667], [1.78689402E12, 71.48333333333333], [1.78689468E12, 69.26666666666667], [1.78689438E12, 73.8], [1.78689456E12, 70.46666666666667], [1.78689426E12, 73.73333333333333], [1.78689396E12, 68.93333333333334], [1.78689462E12, 72.45]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.78689474E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 0);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}


/* jshint esversion:6*/
const playerToken ='X';
const computerToken = 'O';

$(document).ready(function() {
  const grid = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];

  $('.col').click(function() {
    $(this).html(playerToken);
  });



});

var BudgetSpreadsheet = function(id)
{
  this.id = id;
  this.spreadsheet = SpreadsheetApp.openById(this.id).getSheetByName('Budget');
  this.columnNameIndex = 6;
  this.firstCostRow = 7;
  this.lastCostRow = 35;
  this.amountLeftRow = 6;
  this.centsPerDollar = 100;
  this.environment;
  
  this.findColumnByName = function(name)
  {
    var data = this.spreadsheet.getDataRange().getValues();
    var index = data[this.columnNameIndex].indexOf(name);
    var column = index + 1;
    return column;
  }

  this.findEmptyCellRow = function(column)
  {
    var value;
    for (var row = this.firstCostRow; row < this.lastCostRow; ++row)
    {
      value = this.spreadsheet.getRange(row, column).getDisplayValue();
      if (value == "")
      {
        return row;
      }
    }
    return -1;
  }

  this.determineDollarsLeft = function(amountLeft)
  {
    var dollarsLeft;
    dollarsLeft = (amountLeft >= 0) ? Math.floor(amountLeft) : Math.ceil(amountLeft);
    return dollarsLeft;
  }

  this.determineCentsLeft = function(amountLeft, dollarsLeft)
  {
    var centsLeft;
    centsLeft = Math.round((amountLeft * this.centsPerDollar) - (dollarsLeft * this.centsPerDollar));
    return centsLeft;
  }
  
  this.setCellValue = function(category, value)
  {
    var foundCell = false;
    var column = this.findColumnByName(category);
    var row = this.findEmptyCellRow(column);
    if (row > 0)
    {
      this.spreadsheet.getRange(row, column).setValue(+value);
      foundCell = true;
    }
    return foundCell;
  }
  
  this.getCellValue = function(row, column)
  {
    return this.spreadsheet.getRange(row, column).getValue();
  }
};
var familySpreadsheetId = "REDACTED"

function parametersExist(e)
{
  var parametersExist = (e != undefined && e.parameters.amount != undefined && e.parameters.category != undefined);
  return parametersExist;
}

function determineAmount(e)
{
  var amount = this.parametersExist(e) ? JSON.parse(e.parameters.amount) : "987.65";
  return amount;
}

function determineCategory(e)
{
  var category = this.parametersExist(e) ? JSON.parse(e.parameters.category) : "Surplus";
  return category;
}

function determineSubject(e)
{
  var subject = this.parametersExist(e) ? "It" : "Test";
  return subject;
}
  
function doGet(e)
{
    var spreadsheet = new BudgetSpreadsheet(familySpreadsheetId);
  
    var amount = determineAmount(e);
    var category = determineCategory(e);
    var status = determineSubject(e);
  
    if (spreadsheet.setCellValue(category, amount))
    {
      var amountLeft = spreadsheet.getCellValue(spreadsheet.amountLeftRow, spreadsheet.findColumnByName(category));
      var dollarsLeft = spreadsheet.determineDollarsLeft(amountLeft);
      var centsLeft = spreadsheet.determineCentsLeft(amountLeft, dollarsLeft);
      
      status = status + " worked! " + dollarsLeft + " dollars and " + centsLeft + " cents left in " + category + ".";
    }
    else
    {
      status = status + " did not work! Row was not found in the table.";
    }
  
    return ContentService.createTextOutput(status);
}
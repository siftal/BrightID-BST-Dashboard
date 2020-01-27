async function contextBalanceForm(){
  await unlockProvider();
  if (! window.ethereum ) {
    return;
  }
  $(".totalAssigned").html("");
  $(".youAssigned").html("");

  $(".context-balance-input").show();
  $("#contextBalanceModal").modal({
    backdrop: "static",
    keyboard: false
  });
  clearInputs();
};

function contextBalance(){
  var context = $("#assignContextName").val();
  if (! context) {
    var context = $("#balanceContextName").val();
  }
  if (! context) {
    Swal.fire({
      type: "error",
      title: "Missing context",
      text: "Please enter the name of a context",
      footer: ""
    });
    return;
  }
  context = web3.utils.fromAscii(context);
  spContract.methods.totalContextBalance(context).call(function(error, result){
    if (error) {
      console.log(error);
      return;
    }
    $(".totalAssigned").html('Total Assigned: ' + numberDecorator(result) + ' SP');
  });
  spContract.methods.contextBalance(web3.eth.defaultAccount, context).call(function(error, result){
    if (error) {
      console.log(error);
      return;
    }
    $(".youAssigned").html('You Assigned: ' + numberDecorator(result) + ' SP');
  });

}

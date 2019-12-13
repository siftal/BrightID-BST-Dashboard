function assignInit() {
  $("#spContextMsg").html("Waiting for input");
  $("#spContextMsg").css("color", "white");

  $(".totalAssigned").html("");
  $(".youAssigned").html("");

  $(".sp-assign-step").hide();
  $(".sp-assign-input").show();
  $("#spAssignModal").modal({
    backdrop: "static",
    keyboard: false
  });
  clearInputs();
  $("#assignBtn").prop("disabled", false);
  $(".confirm-icon").hide();
  $(".loading-icon").hide();
  $(".loader").hide();
};

function assignSpForm() {
  checkMetaMask();
  assignInit();
}

function assignSp() {
  let amount = $("#spAssign").val();
  let context = $("#assignContextName").val();
  if (amount < 1 ) {
    Swal.fire({
      type: "error",
      title: "Amount too small",
      text: "Please enter a value greater than 0",
      footer: ""
    });
    return;
  }
  if (!context) {
    Swal.fire({
      type: "error",
      title: "Missing context",
      text: "Please enter the name of a context",
      footer: ""
    });
    return;
  }
  $(".sp-assign-input").hide();
  $(".sp-assign-step").show();
  changeActiveStep(3);
  spContract.assignContext.sendTransaction(context, amount, function (error, result) {
    if (error) {
      console.log(error);
      return;
    }
    checkTX(result, 'assignContext');
  });
}

function checkSpBalance() {
  spContract.balanceOf(web3.eth.defaultAccount, function (error, result) {
    if (error) {
      return;
    }
    updateBalanceState(result.c[0]);
  });
}

function updateBalanceState(spBalance) {
  amount = $("#spAssign").val();
  if (!amount || parseFloat(amount) <= 0) {
    $("#spContextMsg").css("color", "white");
    $("#spAssign").val("");
    return;
  }
  if (spBalance < amount) {
    $("#spContextMsg").css("color", "red");
    $("#spContextMsg").html("Insufficient Sp");
  } else {
    $("#spContextMsg").css("color", "green");
    $("#spContextMsg").html("Sufficient Sp");
  }
}

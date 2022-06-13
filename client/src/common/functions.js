const functions = {
  downloadTableAsCSV : (id,separator = ',') => {
    var rows = document.querySelectorAll('table#' + id + ' tr');
    var csv = [];
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll('td, th');
        for (var j = 0; j < cols.length; j++) {
            var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
            data = data.replace(/"/g, '""');
            row.push('"' + data + '"');
        }
        csv.push(row.join(separator));
    }
    var csv_string = csv.join('\n');
    var filename = 'fam_report_' + new Date().toLocaleDateString() + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  },
  userType : (req,user) => {

    if(req.emp_id === user.emp_id) return 1;
    else if(req.user_level < functions.findUserLevel(user)) return 2;
    else return 3;
  },
  findUserLevel: (user) => {
    const userLevel = {
      NORMAL_USER: 0,
      BUDGET_COORDINATOR: 1,
      HOD: 2,
      HR: 3,
      ARCHIVE: 4,
      PRINCIPAL: 5,
      APPROVED: 6,
      REJECTED: -1,
    }
    if (user.designation === "BUDGET") {
      return userLevel.BUDGET_COORDINATOR;
    } else if (user.designation === "HOD") {
      return userLevel.HOD;
    } else if (user.designation === "HR") {
      return userLevel.HR;
    } else if (user.designation === "ARCH_DEPT") {
      return userLevel.ARCHIVE;
    } else if (user.designation === "PRINCIPAL") {
      return userLevel.PRINCIPAL;
    } else return userLevel.NORMAL_USER;
  }

  
};

export default functions;

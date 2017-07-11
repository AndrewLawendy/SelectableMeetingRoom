$(document).ready(function () {
    $("td:contains('Reserved')").addClass('active');
    var timeMax = $('tbody')[0].rows.length - 1;
    var timeDrag = false;
    var activeColumn = false;
    var passedBy = false;
    var DirectionDown = true;
    var tdIndex;
    var trIndex;
    var lastTrIndex;
    $('td').not('.active').on('mousedown', function (e) {
        if (e.which == 1) {
            timeDrag = true; //Click event
            tdIndex = $(this).index();; //Base cell
            trIndex = $(this).closest('tr').index(); //Base row
            lastTrIndex = 0;
            $(this).addClass('selecting');
        }
    });

    $('td').on('mouseenter', function (e) {
        if (timeDrag) {//Click Event
            DirectionDown = true; //Initialise the variable
            var tdHoveredIndex = $(this).index();
            var trHoveredIndex = $(this).closest('tr').index();
            var validToContinue = !$(this).hasClass('active');
            if (validToContinue) {
                if (trHoveredIndex < lastTrIndex) {//Moving up
                    for (var r = trHoveredIndex; r < timeMax; r++) {
                        $('tbody tr:eq(' + r + ')').find('td:eq(' + tdIndex + ')').removeClass('selecting');
                    }
                    for (var i = trIndex; i < (trHoveredIndex + 1); i++) {
                        validToContinue = !$('tr:eq(' + i + ')').find('td:eq(' + tdIndex + ')').hasClass('active');
                        if (validToContinue) {
                            $('tbody tr:eq(' + i + ')').find('td:eq(' + tdIndex + ')').addClass('selecting');
                            passedBy = false;
                        } else {
                            $('td').removeClass('selecting');
                            return;
                        }
                    }
                    DirectionDown = false;
                }
                lastTrIndex = $(this).closest('tr').index(); // Last row
                if (trIndex < trHoveredIndex && DirectionDown) { //Moving down
                if (tdIndex == tdHoveredIndex) { //Same Column
                    if (passedBy) {
                        return;
                    }
                    //$('td').addClass('not-selected');
                    for (var i = trIndex + 1; i < (trHoveredIndex + 1); i++) {
                        validToContinue = !$('tr:eq(' + i + ')').find('td:eq(' + tdIndex + ')').hasClass('active');
                        if (validToContinue) {
                            $('tbody tr:eq(' + i + ')').find('td:eq(' + tdIndex + ')').addClass('selecting');
                        } else {
                            $('td').removeClass('selecting');
                            passedBy = true;
                            return;
                        }
                    }
                } else { //If not same column chose the right cell
                    passedBy = false;
                    tdIndex = tdHoveredIndex;
                    $('td').removeClass('selecting');
                    //$('td').addClass('not-selected');
                    if (timeDrag && validToContinue) {
                        for (var i = trIndex; i < (trHoveredIndex + 1); i++) {
                            validToContinue = !$('tr:eq(' + i + ')').find('td:eq(' + tdIndex + ')').hasClass('active');
                            if (validToContinue) {
                                $('tbody tr:eq(' + i + ')').find('td:eq(' + tdIndex + ')').addClass('selecting');
                            } else {
                                $('td').removeClass('selecting');
                                passedBy = true;
                                return;
                            }
                        }
                    }
                }
            }
            } else {
                $('td').removeClass('selecting');
                passedBy = false;
            }
        }
    });

    $(document).on('mouseup', function () {
        timeDrag = false; //Click event stopped
        $('td').removeClass('selecting');
        passedBy = false;
    });
});

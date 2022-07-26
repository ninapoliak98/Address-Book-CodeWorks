var addressBook = (function () {
    //main array which holds all contacts
    let data = []

    //adds an object taking values from user input
    const addContact = () => {
        let newCont = {
            name: $('#first-name').val(),
            surname: $('#last-name').val(),
            phone: $('#phone-number').val(),
            email: $('#email').val(),
            address: $('#address').val()
        }
        data.push(newCont) //push object into main array 
        console.warn('added', { newCont }) //test to see if data is added
        $('#add-contact')[0].reset();  //resets form values 
    }
    //appends data to table of all contacts
    const saveContacts = (obj) => {
        $('#table-body').empty(); //empties table so there is no repitition 
        $.each(obj, (i, row) => {
            const personData =
            `<tr>
                <td>${row.name}</td>
                <td>${row.surname}</td>
                <td>${row.phone}</td>
                <td>${row.email}</td>
                <td>${row.address}</td>
                <td>${'<input type="button" class = "deleteBtn" id="deleBtn" value="x"/>'}</td>
            </tr>`;
        $("#table-body").append(personData);
        });
    }

    //search for Contacts 
    const findContact = () => {
        $('#cont-results').empty();
        let searchName = $('#search-c').val().toLowerCase()
        let nSearch = searchName.split(' ')
        //if only first name is entered all people with the same first name are returned 
        if (nSearch.length === 1) {
            if (!(data.find(e => e.name.toLowerCase() === searchName))) {
                foundNotfound(false)
            } else {
                for (const key in data) {
                    if (nSearch[0].toLowerCase() === data[key].name.toLowerCase()) {
                        foundNotfound(true)
                        tableData('cont-results', data[key])
                    }
                }
            }
        }
        //if the first and last name is entered the person matching both of this is called 
        else if (nSearch.length > 1) {
            let fName = nSearch[0] + nSearch[1]
            const findName = data.find(e => e.name.toLowerCase() + e.surname.toLowerCase() === fName.toLowerCase())
            if (findName) {
                foundNotfound(true)
                tableData('cont-results', findName)
            } else if (!(data.find(e => e.name.toLowerCase() + e.surname.toLowerCase() === fName))) {
                foundNotfound(false)
            }
        }
    }
    //delete Contacts 
    const deleteContact = (index) => {
        data.splice(index, 1)
        return data
    }
    const foundNotfound = (found) => {
        if (found === true) {
            $("#results").show()
            $("#foundNames").show();
            $("#search-bar").hide();
        } else if (found === false) {
            $("#results").show()
            $("#search-bar").hide();
            $("#foundNames").hide();
            $('#no-result').show();
        }
    }
    //enters table data 
    const tableData = (tableID, info) => {
        const personData =
            `<tr>
                <td>${info.name}</td>
                <td>${info.surname}</td>
                <td>${info.phone}</td>
                <td>${info.email}</td>
                <td>${info.address}</td>
            </tr>`;
        $('#' + tableID).append(personData);
    }

    //interactions with webpage 
    $(document).ready(function () {
        //hides all but add-contact div on load
        window.onload = function () {
            $("#search-bar").hide();
            $("#all-contacts").hide();
            $("#new-contact").show();
            $("#results").hide()
        };
        //when submit button is pressed function that adds data is called
        $("#submit-btn").click(function () {
            addContact()
            console.log(data)
            return false;
        })
        //searches for a contact 
        //on click deletes person for some reason .click wasnt working but .on worked 
        $(document).on('click', '.deleteBtn', function () {
            let index = $(this).closest("tr").index(); //finds index of the person on table
            data = deleteContact(index)
            saveContacts(data)
        })
        $("#search-btn").click(function () {
            findContact();
            return false
        })
        $(".bar").click(function() {
            if(this.id === "search"){
                $(".nav-all").not("#search-bar").hide();
                $("#search-bar").show();
            } else if(this.id ==="home") {
                $(".nav-all").not("#new-contact").hide();
                $("#new-contact").show();
            } else if(this.id === "all-cont"){
                saveContacts(data)
                $(".nav-all").not("#all-contacts").hide();
                $("#all-contacts").show();
              }
           })

    }) //end of doc.ready
})(); //end of addressBook







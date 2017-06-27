/*
 * GET users listing.
 */

exports.list = function(req, res) {

    req.getConnection(function(err, connection) {

        var query = connection.query('SELECT * FROM jobs', function(err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('customers', {
                page_title: "Customers - Node.js",
                data: rows
            });


        });

        //console.log(query.sql);
    });

};

exports.add = function(req, res) {
    res.render('add_customer', {
        page_title: "Add Customers - Node.js"
    });
};


/*Save the customer*/
exports.save = function(req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var date = new Date();
    date = date.toUTCString();
    date = date.split(" ")
    date = date[1] + " " + date[2] + " " + date[3];
    console.log(date)
    req.getConnection(function(err, connection) {

        var data = {

            CompanyName: input.name,
            JobTitle: input.address,
            Description: input.email,
            DateApplied: date

        };

        var query = connection.query("INSERT INTO jobs set ? ", data, function(err, rows) {

            if (err)
                console.log("Error inserting : %s ", err);

            res.redirect('/');

        });

        // console.log(query.sql); get raw query

    });
};

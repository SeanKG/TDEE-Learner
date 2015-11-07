var React = require('react');
var ReactDOM = require('react-dom');

var DataRow = React.createClass({
    render: function() {
        return <tr>
            <td>Date: {this.props.day.date.toDateString()}</td>
            <td>Calories burned: {this.props.day.cals}</td>
            <td>Weight: {this.props.day.weight}</td>
        </tr>;
    }
});


var DataTable = React.createClass({
    render: function(){
        var rows = [];
        this.props.days.forEach(function(day){
            rows.push(<DataRow day={day} key={day.date} />);
        });
        return (
            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
});

var daysData = [
    {
        date: new Date(2015, 11, 6),
        cals: 1755,
        weight: 207.3
    },
    {
        date: new Date(2015, 11, 5),
        cals: 1755,
        weight: 207.3
    },
    {
        date: new Date(2015, 11, 4),
        cals: 1755,
        weight: 207.3
    }
];

ReactDOM.render(
    <DataTable days={daysData}/>,
    document.getElementById('container')
);

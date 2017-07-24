import {Funs} from '../../../common/src/fun.es6';
import {Clndr } from './Clndr.jsx';
export const Calendar = React.createClass({
    render(){
        let data = this.props.data,
            today = Funs.dateFormat(new Date(),'yyyy.MM.dd'),
            validDates = data.validDates,
            firstValidDates =  data.firstValidDates;
        return (
            <section className={data.showClndr ?"calendar-module expansion":"calendar-module"} style={{margin:'1rem'}}>
                <span className={data.showClndr?'transparent':'expansion-btn'} onTouchStart={data.handleClndr}>
                    <img src="../static/img/layout/i-calendar.png" />
                    {
                        parseInt(data.viewDate.substring(5,7))+'月'+parseInt(data.viewDate.substring(8,10))+'日'
                    }
                </span>
                {
                    data.showClndr ?
                        <section className="calendar-wrap">
                            <a className="calendar-ctrl" id="calendar-ctrl" onTouchStart={data.handleClndr}> </a>
                            <Clndr tagDates={validDates} firstTagDates={firstValidDates} month={new Date().getMonth()+1} />
                        </section>
                        :
                        null
                }
            </section>
        )
    }
});
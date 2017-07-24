export const Mileage = React.createClass({
    render(){
        let data = this.props.data;
        return (
            <section className={data.showClndr?"mileage flex transparent":"mileage flex"}>
                <aside className="flex-cell"><h2>{data.calories}</h2><h5>千卡</h5></aside>
                <aside className="flex-cell"><h2>{data.stepCount}</h2><h5>步数</h5></aside>
                <aside className="flex-cell"><h2>{data.kilometer}</h2><h5>公里</h5></aside>
            </section>
        )
    }
});
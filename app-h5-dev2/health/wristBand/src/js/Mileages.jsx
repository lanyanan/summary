export const Mileage = React.createClass({
    render(){
        let data = this.props.data;
        [
            {
                value: '108',
                txt: '睡眠'
            }
        ]
        return (
            <section className={1?"mileage flex":"mileage flex"}>
                <aside className="flex-cell"><h2>{data.A}</h2><h5>千卡</h5></aside>
                <aside className="flex-cell"><h2>{data.B}</h2><h5>步数</h5></aside>
                <aside className="flex-cell"><h2>{data.C}</h2><h5>公里</h5></aside>
            </section>
        )
    }
});
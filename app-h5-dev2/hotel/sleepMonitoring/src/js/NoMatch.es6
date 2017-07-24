let {PropTypes,Navigation} = React;

const NoMatch = React.createClass({
    mixins: [Navigation],
    contextTypes: {
        router: PropTypes.object.isRequired
    },
    componentDidMount(){
        if(this.isMounted()){
            this.context.router.replace('/');
        }
    },
    render (){
        return null;
    }
});

export default NoMatch;
import React ,{Component} from 'react';
import {Card,CardImg,Breadcrumb,BreadcrumbItem,
    Button,CardText,CardBody,CardTitle
    ,Modal,ModalBody,ModalHeader,Label,Col,Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm,Control,Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform , Fade, Stagger} from 'react-animation-components';

    function RenderComments({comments,postcomment,dishId})
    {
        if(comments==null)
        {
            return(<div></div>)
        }
        const cmts=comments.map(comment =>{
            return(
                <Fade in>
                <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author} ,
                &nbsp;
                    {new Intl.DateTimeFormat('en-US',{
                        year:'numeric',
                        month:'short',
                        day:'2-digit'
                    }).format(new Date(comment.date))}
                    </p>
                </li>
                </Fade>
            )
        })
        return(
            <div className="col-sm-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                <Stagger in>
                    {cmts}
                </Stagger>
                </ul>
                
                <CommentForm dishId={dishId} postcomment={postcomment}>


                </CommentForm>
            </div>
        )

    }
    function RenderDish({dish})
    {
        if(dish==null)
        {
            return(
                <div></div>
            )
        }
        return(
            <div className="col-sm-12 col-md-5 m-1">
                <FadeTransform in
                    transformProps={{
                        exitTransform :'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>                
                            </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        )
    }

    const DishDetail=(props) => {
        if(props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish==null)
        {
            return(<div></div>)
        }
        else if(props.dish!=null)
        {
                return(
                    <div className="container">
                        <div className="row">
                                <Breadcrumb>
                                    <BreadcrumbItem>
                                        <Link to='/menu'>Menu</Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbItem active>
                                        {props.dish.name}
                                    </BreadcrumbItem>
                                </Breadcrumb>
                                <div className="col-12">
                                    <h3>{props.dish.name}</h3>
                                    <hr/>
                                </div>
                            </div>
                            <div className="row">
                                <RenderDish dish={props.dish} />
                                <RenderComments comments={props.comments}
                                postcomment={props.postcomment}
                                dishId={props.dish.id} />   
                            </div>
                    </div>
                )
        }
    }
    const required = (val) => val && val.length;
    const maxlength = (len) => (val) => !(val) || (val.length <= len);
    const minlength = (len) => (val) => val && (val.length >= len); 

    class CommentForm extends Component {
        constructor(props) {
            super(props);

            this.state ={
                isModalOpen :false
            };
            this.toggleModal=this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);

        }

        toggleModal () {
            this.setState ({
                isModalOpen : !this.state.isModalOpen
            });
        }
        handleSubmit(values) {
            this.toggleModal();
            console.log('Current State is: ' + JSON.stringify(values));
            alert('Current State is: ' + JSON.stringify(values));

            this.props.postcomment(this.props.dishId, values.rating , values.author,values.comment);
        }
        render() {
            return (
                <div>
                    <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg" /> Submit Comments</Button>

                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comments</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label for="rating" md={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" id="rating" name="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlfor="author" md={12}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".author" name="author" id="author"
                                        placeholder="Author"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minlength: minlength(3),
                                            maxlength: maxlength(15)
                                        }} />
                                        <Errors className="text-danger" model=".author"
                                        show="touched"
                                        messages={{
                                            required :'Required',
                                            minlength : 'Must be greater than 2 characters',
                                            maxlength : 'Must be 15 characters or less'
                                        }}/>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                <Label htmlfor="comment" md={12}>Your Feedback</Label>
                                <Col md={12}>
                                        <Control.textarea model=".comment" name="comment" id="comment"
                                        placeholder="Your Comments"
                                        className="form-control"
                                        rows="6"
                                        resize="none"
                                        validators={{required}} />
                                        <Errors className="text-danger" model=".comment" show="touched"
                                        messages={{
                                            required : 'Required'
                                        }} />
                                </Col>
                                </Row>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            )
        }
    }
export default DishDetail;
import { baseURL } from '@/components/config/config';
import { setApiUrl } from '@/components/constants/Matrices';
import { Component } from 'react'

const pageId='AddMember';

interface IState{
  isModalVisible:boolean
}
interface IProps{}
interface SS{}

export default class useAddMemberLogic extends Component<IProps,IState,SS> {
    constructor(props:IProps){
      super(props)
      this.state ={
        isModalVisible:false
      }
    }

    toggleModal = () => {
      this.setState({isModalVisible:!this.state.isModalVisible})
    }

    navigateToMember = () => {
      console.log("navigate")
    }
}

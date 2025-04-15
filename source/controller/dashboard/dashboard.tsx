import { baseURL } from '@/components/config/config';
import { setApiUrl } from '@/components/constants/Matrices';
import { Component } from 'react'

const pageId='Dashboard';

interface IState{}
interface IProps{
  getDashBoardData:() =>void
  loading:boolean
  dashboardResponse:{
    "TodayAtGlance": [],
    "ClubNews": {
      "ID": string
      "NewsTitle": string
      "Date": string
      "Description":string
      "NewsImage": string
      "NewsVideoUrl": string
      "DepartmentName": string
      "Author": string
      "Thumbnail": string
      "NewsImageList": {
        "ImageID": string
        "NewsImage":string
        "Sequence": 1,
        "Type": string
        "DisplayOrder": string
    }[]
  }[],
    "UpComingEvent": [],
    "ConnectWithUs": {
      "ID": number
      "CategoryName": string
      "CategoryImage": string
      "Action": string
  }[],
    "DashboardCategory": {
      "ID": number
      "CategoryName":string
      "CategoryImage":string
      "Action": string
  }[],
    "EmailMarketing": [],
    "MessageBoard": [],
    "MemberAnnouncement": [],
    "MemberNameDisplay": string
    "FullName": string
    "Facebook":string
    "Instagram":string
    "Pinterest":string
    "Twitter":string
    "AppToPrivateSite":string
    "ResponseCode": string
    "ResponseMessage": string
    "EnableFitnessActivity": string
    "EnableSpaAppointment":string
    "ProfileFullName":string
    "CaptainName":string
    "DashBoardDate": string
    "AppVersion": string
    "DBoardDate": string
    "DBoardTime":string
    "UserRolesandPrivilages": [],
    "IsShowCovidRules": number,
    "CovidRulesText": string
    "EnableAppointment":string
    "EnableTennisLesson":string
    "BMSDepartment": {
      "Department":string
      "ShowinAppandSite":number
  }[],
    "EnableGolfLesson":string
    "EnableBookTeeTime": string
}
  errorMessage:string
}
interface SS{}

export default class useDashboardLogic extends Component<IProps,IState,SS> {
    constructor(props:IProps){
      super(props)
      this.state ={
        baseUrl:""
      }
    }
   getBaseUrl = async () => {
      const baseURL = await setApiUrl()
      this.setState({baseUrl:baseURL})
      console.log(baseURL,"--->url pf testing")
    }
    componentDidMount(): void {
      this.getBaseUrl()
      this.props.getDashBoardData()
    } 
}

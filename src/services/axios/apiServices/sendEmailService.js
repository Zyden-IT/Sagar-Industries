import * as endpoints from "../ApiEndPoints.js";
import { axiosPostWithencryption } from "../AxiosRequests.js";


export default class sendEmailServices {
  async sendInquiryToAdminForSagarIndustries(request) {
    return axiosPostWithencryption(endpoints.sendInquiryToAdminForSagarIndustries, request);
  }
}

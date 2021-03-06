import AbstractLoad from '../../AbstractLoad.js';
import GridManager from '../managers/GridManager.js';
import PageManager from '../managers/PageManager.js';
import DialogUtility from '../util/DialogUtility.js';
import MaterialsUtils from '../util/MaterialsUtils.js';
import NgsFormValidator from '../util/NgsFormValidator.js';

export default class AbstractCmsAddUpdateLoad extends AbstractLoad {

  constructor() {
    super();
  }


  getContainer() {
    if(this.args().editActionType === "popup"){
      return "modal";
    }
    return "loadContent";
  }

  onError(params) {
    DialogUtility.showErrorDialog(params.msg);
  }

  getModalTitle() {
    let title = "";
    if(this.args().saveAction){
      let actionPath = this.args().saveAction.split(".");
      let actionName = actionPath[actionPath.length - 1].split("_").join(" ");
      title = actionName.replace(/\b[a-z]/g,
        function (firstLatter) {
          return firstLatter.toUpperCase();
        })
    }
    return title;
  }

  afterLoad() {
    this.loadedDialog = null;
    if(this.getContainer() === "modal"){
      this.loadedDialog = MaterialsUtils.createCmsModal(this.getModalTitle());
    }
    MaterialsUtils.initMaterialElements(this.getContainer());
    GridManager.init(this.getContainer());
    this.doCancelAction();
    this.modifyParentRedirect();
    this.doSaveItem();
    this.afterCmsLoad();
    this.hideHeaderAddButton();
    this.ngsImageUpload();
  }

  modifyParentRedirect() {
    if(Object.keys(this.setCancelParams()).length){
      var parentRedirect = $("#main_container").find(".f_redirect").last();
      if(parentRedirect.length){
        parentRedirect.attr("params", JSON.stringify(this.setCancelParams()));
      }
    }
  }

  doCancelAction() {
    document.querySelectorAll("#" + this.getContainer() + " .f_cancel").click(event => {
      if(this.loadedDialog){
        this.loadedDialog.close();
        return;
      }
      NGS.load(this.args().cancelLoad, this.setCancelParams());
    });
  }

  setCancelParams() {
    return {};
  }

  hideHeaderAddButton() {
    //$('#addItem').addClass('is_hidden');
  }

  doSaveItem() {
    let submitFormElem = document.getElementById("addUpdateForm");
    if(!submitFormElem){
      return;
    }
    submitFormElem.onsubmit = function (event) {
      return false;
    };
    document.querySelectorAll("#" + this.getContainer() + " #saveItem").click(event => {
      let formElem = document.getElementById('addUpdateForm');
      let validationStatus = NgsFormValidator(formElem);
      formElem.querySelectorAll('.f_tabTitle').removeClass('error');
      if(!validationStatus){
        let errorTabIndexes = [];
        formElem.querySelectorAll('.f_cms_tab-container').forEach((element, index) => {
          if(element.querySelector('.invalid')){
            errorTabIndexes[index] = element.id;
            document.getElementById(element.id + '_title').addClass('error');
          }
        });
        MaterialsUtils.showVerticalTabsError(errorTabIndexes, formElem.querySelector('.f_cms_vertical-tabs'));
        return false;
      }
      let formData = new FormData(formElem);
      formData = this.beforeSave(formData);
      if(formData === false){
        return false;
      }
      if(this.args().parentId){
        formData.append('parentId', this.args().parentId);
      }
      formData = this._mergeWithPageParams(formData);
      NGS.action(this.args().saveAction, formData, () => {
        if(this.loadedDialog){
          this.loadedDialog.close();
        }
      });
    });
  }

  /**
   *
   * @param params FormData
   * @returns {*}
   */
  _mergeWithPageParams(params) {
    let listingParams = PageManager.getGlobalParams();
    for (let i in listingParams) {
      if(listingParams.hasOwnProperty(i) && !params[i]){
        params.set('pageParams[' + i + ']', listingParams[i]);
      }
    }
    return params;
  }

  /**
   *
   * should return FormData
   *
   * @param formData FormData
   *
   * @returns FormData
   */
  beforeSave(formData) {
    return formData;
  }

  onUnLoad() {
    document.querySelector('#addItem').removeClass('is_hidden');
  }

  afterCmsLoad() {

  }

  getMethod() {
    return "GET";
  }

  validateStartEndDate(dateStart, dateEnd, format) {
    let dateTimeStart = dateStart ? moment(dateStart, format) : null;
    let dateTimeEnd = dateEnd ? moment(dateEnd, format) : null;
    return !(dateTimeStart && dateTimeEnd && dateTimeEnd.isBefore(dateTimeStart));
  }

  ngsImageUpload() {
    document.querySelectorAll('.f_uploadImage').forEach((fileElem) => {
      if(fileElem.attr('data-im-preview')){
        let imagePreviewElem = document.querySelector(fileElem.attr('data-im-preview'));
        fileElem.addEventListener('change', (event) => {
          let inputElem = event.currentTarget;
          if(!inputElem.files || !inputElem.files[0]){
            return;
          }
          let reader = new FileReader();
          reader.onload = (e) => {
            this.imageData = e.target.result;
            imagePreviewElem.attr('src', e.target.result);
          };
          reader.readAsDataURL(inputElem.files[0]);
        })
      }
    })
  }

  showError(elem, msg) {
    this.hideError(elem);
    elem.addClass('invalid');
    elem.addClass('ngs');
    elem.parentNode.insertAdjacentHTML('beforeend', "<div class='ilyov_validate'>" + msg + "</div>");
  }

  hideError(elem) {
    elem.removeClass('invalid');
    elem.addClass('ngs');
    let errorElement = elem.parentNode.getElementsByClassName('ilyov_validate');
    if(errorElement.length === 0){
      return;
    }
    errorElement[0].remove();
  }

}
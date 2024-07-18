import {roundUpToNearest} from "../util.js";

/** @type {import("/src/classes/SplitDivvy.js").SplitDivvyObj} */

/**
 * TODO type later
 */
export const viewDivvyStore = {
  isModalVisible: false,
  showConfirmDelete: false,
  /** @type {DivvyObj} */
  divvy: {},

  showDivvyModal(data) {
    this.isModalVisible = true;
    this.showConfirmDelete = false;
    this.divvy = data;

    setTimeout(() => {
      document.getElementById('modal_view_divvy').showModal()
    }, 0)
  },

  async deleteDivvy(id) {
    try {
      await Alpine.store("dv_save").deleteSingleDivvy(id)
      this.hideDivvyModal()
      await Alpine.store("dv_save").getSavedData()
    } catch(error) {
      console.error(error)
    }
  },

  hideDivvyModal(){
    this.isModalVisible = false;
  }
}
<template>
  <div>
    <load-spinner :overlay="loading"></load-spinner>
    <empty-state
      :heightPercent="95"
      icon="mdi-death-star-variant"
      label="Проект не найден"
      description="Возможно проект был удален, или еще не опубликован."
      v-if="isNotFound"
    />
    <v-container fluid v-if="!!project">
      <v-row justify="center" no-gutters>
        <v-col xl="7" lg="9" md="11" sm="9" xs="12" class="my-3">
          <v-row justify="center" no-gutters>
            <v-col md="7" sm="12" class="pa-4">
              <edit-popup
                :editable="isEditable"
                fieldType="link"
                fieldName="image_link"
                :value="project.image_link"
                @reload="reloadProject"
                @error="showError"
              >
                <project-picture
                  :withOffset="showEventDate"
                  :imageSrc="project.image_link"
                />
              </edit-popup>
              <edit-dialog
                :editable="isEditable"
                fieldType="datetime"
                fieldName="event_date"
                :value="project.event_date"
                @reload="reloadProject"
                @error="showError"
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-sheet v-on="on" color="primary" v-if="showEventDate">
                      <datetime
                        :compact="false"
                        :datetime="project.event_date"
                      />
                    </v-sheet>
                  </template>
                  <span>Дата и время проведения</span>
                </v-tooltip>
              </edit-dialog>
            </v-col>
            <v-col xl="5" lg="5" md="5" sm="12">
              <v-row class="mx-4 mt-3 mb-0">
                <v-col class="pa-0">
                  <edit-select-popup
                    :editable="isEditable"
                    fieldType="type"
                    fieldName="project_type"
                    :value="project.project_type"
                    @reload="reloadProject"
                    @error="showError"
                  >
                    <div class="subtitle-2 font-weight-bold accent--text">
                      {{ project.project_type.name.toUpperCase() }}
                    </div>
                  </edit-select-popup>
                </v-col>
                <v-col class="pa-0">
                  <edit-select-popup
                    :editable="isEditable"
                    fieldType="category"
                    fieldName="category"
                    :value="project.category"
                    @reload="reloadProject"
                    @error="showError"
                  >
                    <v-row no-gutters>
                      <v-spacer></v-spacer>
                      <category-icon
                        :size="24"
                        :category="project.category"
                        :withTooltip="true"
                        :primary="true"
                      />
                    </v-row>
                  </edit-select-popup>
                </v-col>
              </v-row>
              <v-row class="mx-4">
                <edit-popup
                  :editable="isEditable"
                  fieldType="text"
                  fieldName="title"
                  :value="project.title"
                  :maxLength="25"
                  @reload="reloadProject"
                  @error="showError"
                >
                  <div class="primarytext--text display-1">
                    {{ project.title }}
                  </div>
                </edit-popup>
              </v-row>
              <v-row class="ma-4 subtitle-area">
                <edit-popup
                  :editable="isEditable"
                  fieldType="text"
                  fieldName="subtitle"
                  :value="project.subtitle"
                  :maxLength="50"
                  @reload="reloadProject"
                  @error="showError"
                >
                  <div class="secondarytext--text title font-weight-regular">
                    {{ project.subtitle }}
                  </div>
                </edit-popup>
              </v-row>

              <v-row class="mx-4" align="center">
                <v-avatar size="50">
                  <img
                    v-bind:src="project.owner.avatar"
                    onerror="this.onerror=null;this.src='/images/avatar.png';"
                    alt="Author avatar"
                  />
                </v-avatar>
                <v-col cols="9" class="pa-0">
                  <v-row class="mx-4">
                    <router-link v-bind:to="'/user/' + project.owner.id">
                      <div class="primarytext--text title font-weight-regular">
                        {{ project.owner.first_name }}
                        {{ project.owner.last_name }}
                      </div>
                    </router-link>
                  </v-row>
                  <v-row class="mx-4">
                    <div class="primarytext--text body-1 font-weight-medium">
                      {{ project.owner.profile.project_count }}
                    </div>
                    <project-counter
                      class="primarytext--text body-1 ml-1"
                      :count="project.owner.profile.project_count"
                    />
                  </v-row>
                </v-col>
              </v-row>

              <v-row class="mx-4 mt-2" no-gutters>
                <v-col cols="6" class="pa-0">
                  <v-row align="baseline" no-gutters>
                    <goal-counter
                      class="primarytext--text headline"
                      :type="project.project_type"
                      :count="project.total"
                      :animate="true"
                      mode="units"
                    />
                    <goal-counter
                      class="primarytext--text body-1 pl-1"
                      :type="project.project_type"
                      :count="project.total"
                    />
                  </v-row>
                </v-col>
                <v-col
                  cols="6"
                  class="pa-0"
                  v-if="isMoneyProject && !isCombineProject"
                >
                  <v-row justify="end" align="baseline" no-gutters>
                    <div class="primarytext--text headline">
                      {{ donations.length }}
                    </div>
                    <goal-counter
                      class="primarytext--text body-1 pl-1"
                      :type="project.project_type"
                      :count="donations.length"
                      mode="members"
                    />
                  </v-row>
                </v-col>
              </v-row>

              <v-row class="mx-4 my-1">
                <v-progress-linear
                  color="accent"
                  height="10px"
                  rounded
                  v-bind:value="project.percent"
                />
              </v-row>

              <v-row class="mx-4 mb-4" no-gutters>
                <v-col cols="6" class="pa-0">
                  <edit-goal-popup
                    :editable="isEditable"
                    :amount="project.goal_amount"
                    :people="project.goal_people"
                    :type="project.project_type"
                    @reload="reloadProject"
                    @error="showError"
                  >
                    <v-row align="baseline" no-gutters>
                      <div class="primarytext--text body-1">
                        {{ project.percent }}% из
                      </div>
                      <goal-counter
                        v-if="isMoneyProject"
                        class="primarytext--text body-1 pl-1"
                        :type="project.project_type"
                        :count="project.goal_amount"
                        mode="units"
                      />
                      <div
                        class="primarytext--text body-1"
                        v-if="isCombineProject"
                      >
                        ₽
                      </div>
                      <goal-counter
                        v-if="!isMoneyProject"
                        class="primarytext--text body-1 px-1"
                        :type="project.project_type"
                        :count="project.goal_people"
                        mode="units"
                      />
                      <div
                        class="primarytext--text body-1"
                        v-if="!isMoneyProject"
                      >
                        людей
                      </div>
                    </v-row>
                  </edit-goal-popup>
                </v-col>
                <v-col cols="6" class="pa-0">
                  <edit-dialog
                    :editable="isEditable"
                    fieldType="date"
                    fieldName="release_date"
                    :value="project.release_date"
                    @reload="reloadProject"
                    @error="showError"
                  >
                    <days-counter
                      class="body-1"
                      :endDate="project.release_date"
                      :withIcon="false"
                      :ended="daysShow"
                      :alignBottom="true"
                      :justifyEnd="true"
                    />
                  </edit-dialog>
                </v-col>
              </v-row>
              <v-row class="ma-4">
                <button-set
                  :status="project.status"
                  :type="project.project_type"
                  :donation="currentDonation"
                  :suggest="suggestAmount"
                  :donateLimit="project.goal_amount - project.total"
                  @update="updateDonation"
                  @delete="deleteDonation"
                  @create="createDonation"
                />
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row justify="center" no-gutters v-if="!loading" class="tabs-area">
        <tabs
          :donations="donations"
          :isMember="currentDonation ? true : isOwner"
          :description="project.description"
          :instruction="project.instructions"
          :status="project.status"
          :type="project.project_type"
          @reload="reloadProject"
          @error="showError"
        />
      </v-row>
      <v-row justify="center" no-gutters v-if="!loading">
        <v-icon>mdi-pac-man</v-icon>
        <v-icon>mdi-circle-small</v-icon>
        <category-icon
          :size="16"
          :category="project.category"
          :withTooltip="false"
        />
        <v-icon>mdi-circle-small</v-icon>
      </v-row>
      <v-row justify="center" no-gutters v-if="!loading">
        <div class="mt-4 secondarytext--text body-2 font-weight-regular">
          Еще проекты в категории
        </div>
      </v-row>
      <v-row justify="center" no-gutters v-if="!loading">
        <v-btn
          color="primary"
          small
          text
          tile
          :to="{
            name: 'Dashboard',
            query: { category: project.category.id.toString() }
          }"
        >
          {{ project.category.name.toUpperCase() }}
        </v-btn>
      </v-row>
    </v-container>
    <manage-menu
      :status="project.status"
      :donations="donations"
      :type="project.project_type"
      v-if="project && manageAllowed"
      @mark="donateMarkShown = true"
      @publish="publishConfirmShown = true"
      @delete="deleteConfirmShown = true"
    />
    <v-dialog
      v-if="!!project && isMoneyProject && donations"
      v-model="donateMarkShown"
      max-width="350px"
    >
      <donate-mark
        @mark="markDonation"
        :donations="donations"
        :type="project.project_type"
      />
    </v-dialog>
    <v-dialog v-model="publishConfirmShown" max-width="400px">
      <confirm-dialog @confirm="publishProject">
        <div class="pt-6 primarytext--text headline text-center">
          Опубликовать проект?
        </div>
        <div class="mt-5 primarytext--text body-1 text-center">
          После публикации проект станет видет пользователям, а редактирование
          проекта будет
          <b>
            невозможно
          </b>
          .
        </div>
      </confirm-dialog>
    </v-dialog>
    <v-dialog v-model="deleteConfirmShown" max-width="400px">
      <confirm-dialog @confirm="deleteProject">
        <div class="pt-6 primarytext--text headline text-center">
          Вы уверены?
        </div>
        <div class="mt-5 primarytext--text body-1 text-center">
          Восстановить данный проект будет невозможно.
        </div>
      </confirm-dialog>
    </v-dialog>
    <v-snackbar v-model="messagePopup" :multi-line="true">
      <div v-html="message" class="mt-3 caption text-center" />
    </v-snackbar>
  </div>
</template>

<style lang="scss" scoped>
.subtitle-area {
  min-height: 70px;
}
.tabs-area {
  min-height: 300px;
}
.date-plank {
  position: relative;
  z-index: 2;
  margin-top: -44px;
}
</style>

<script>
import { mapGetters } from "vuex";
import LoadSpinner from "../lib/loading";
import DaysCounter from "../lib/daysCounter";
import Datetime from "../lib/datetime";
import GoalCounter from "../lib/goalCounter";
import ProjectCounter from "../lib/projectCounter";
import EmptyState from "../lib/EmptyState";
import CategoryIcon from "../lib/categoryIcon";
import EditPopup from "./EditPopup";
import EditDialog from "./EditDialog";
import EditGoalPopup from "./EditGoalPopup";
import EditSelectPopup from "./EditSelectPopup";
import ButtonSet from "./ButtonSet";
import ProjectPicture from "./ProjectPicture";
import Tabs from "./Tabs";
import ManageMenu from "./ManageMenu";
import ConfirmDialog from "./ConfirmDialog";
import DonateMark from "./DonateMark";
import {
  STATUS_DRAFT,
  STATUS_SEARCH,
  STATUS_FAIL,
  STATUS_SUCCESS
} from "../lib/const/status";

export default {
  components: {
    LoadSpinner,
    GoalCounter,
    ProjectCounter,
    EmptyState,
    CategoryIcon,
    EditPopup,
    EditDialog,
    EditGoalPopup,
    EditSelectPopup,
    ButtonSet,
    ProjectPicture,
    Tabs,
    ManageMenu,
    DonateMark,
    ConfirmDialog,
    Datetime,
    DaysCounter
  },
  name: "project",
  created() {
    this.getProject();
    this.getDonations();
  },
  computed: {
    ...mapGetters(["PROFILE"]),
    showEventDate() {
      if (this.isMoneyProject) {
        return false;
      }
      if (this.isEditable) {
        return true;
      }
      if (this.project.event_date) {
        return true;
      }
      return false;
    },
    isEditable() {
      return this.project.status === STATUS_DRAFT;
    },
    daysShow() {
      return !(this.isEditable || this.project.status == STATUS_SEARCH);
    },
    isNotFound() {
      if (this.error) {
        return this.error.request.status == 404;
      }
      return false;
    },
    isMoneyProject() {
      if (this.project.project_type.goal_by_amount) {
        return true;
      }
      return false;
    },
    isPeopleProject() {
      if (this.project.project_type.goal_by_people) {
        return true;
      }
      return false;
    },
    isCombineProject() {
      if (
        this.project.project_type.goal_by_amount &&
        this.project.project_type.goal_by_people
      ) {
        return true;
      }
      return false;
    },
    isOwner() {
      return this.PROFILE.id == this.project.owner.id;
    },
    manageAllowed() {
      if (!this.isOwner) {
        return false;
      }
      if (
        this.project.status == STATUS_FAIL ||
        this.project.status == STATUS_SUCCESS ||
        this.project.status == STATUS_SEARCH
      ) {
        return false;
      }
      return true;
    },
    currentDonation() {
      for (let donation of this.donations) {
        if (donation.user.id === this.PROFILE.id) {
          return donation;
        }
      }
      return null;
    },
    suggestAmount() {
      if (this.project.goal_by_people == 0) {
        return 0;
      }
      let peoples = this.donations.length;
      if (this.donations.length < this.project.goal_people) {
        peoples = this.project.goal_people;
      }
      return Math.ceil(this.project.goal_amount / peoples);
    }
  },
  methods: {
    recalcPercent() {
      if (this.isPeopleProject) {
        this.project.percent = Math.floor(
          (this.project.total / this.project.goal_people) * 100
        );
      } else {
        this.project.percent = Math.floor(
          (this.project.total / this.project.goal_amount) * 100
        );
      }
    },
    updateDonation(newPayment) {
      this.project.total += newPayment;
      this.recalcPercent();
    },
    deleteDonation(wasPayment) {
      this.project.total -= wasPayment;
      this.recalcPercent();
      this.getDonations();
    },
    createDonation(payment) {
      this.project.total += payment;
      this.recalcPercent();
      this.getDonations();
    },
    reloadProject() {
      this.getProject();
    },
    publishProject() {
      if (this.project.project_type.goal_by_amount) {
        if (this.project.goal_amount <= 0) {
          this.showError("Указана некорректная сумма!");
          this.publishConfirmShown = false;
          return;
        }
      }
      if (this.project.project_type.goal_by_people) {
        if (this.project.goal_people <= 0) {
          this.showError("Указано некорректное количество участников!");
          this.publishConfirmShown = false;
          return;
        }
      }
      this.loading = true;
      let data = { published: true };
      this.axios
        .patch("/project/" + this.$route.params.id, data)
        // eslint-disable-next-line no-unused-vars
        .then(resp => {
          this.loading = false;
          this.publishConfirmShown = false;
          this.reloadProject();
        })
        .catch(error => {
          this.showError(error);
          this.loading = false;
        });
    },
    deleteProject() {
      this.loading = true;
      this.axios
        .delete("/project/" + this.$route.params.id)
        .then(resp => {
          if (resp.request.status == 204) {
            this.loading = false;
            this.$router.push({ name: "Dashboard" });
          }
        })
        .catch(error => {
          this.showError(error);
          this.loading = false;
        });
    },
    showError(data) {
      if (typeof data === "object") {
        if (data.response.data.detail) {
          this.message = data.response.data.detail;
        }
      } else {
        this.message = data;
      }
      this.messagePopup = true;
    },
    markDonation(id, mark) {
      let currentDonation = this.donations.find(donation => donation.id === id);
      currentDonation.paid = mark;
    },
    getProject() {
      this.loading = true;
      this.axios({ url: "/project/" + this.$route.params.id })
        .then(resp => {
          this.project = resp.data;
          this.loading = false;
        })
        .catch(resp => {
          this.error = resp;
          this.loading = false;
        });
    },
    getDonations() {
      this.axios({ url: "/donation?project_id=" + this.$route.params.id })
        .then(resp => {
          this.donations = resp.data;
        })
        .catch(resp => {
          this.showError(resp);
        });
    }
  },
  data() {
    return {
      editMenu: false,
      messagePopup: false,
      message: null,
      donateMarkShown: false,
      publishConfirmShown: false,
      deleteConfirmShown: false,
      loading: true,
      error: null,
      project: null,
      donations: []
    };
  }
};
</script>

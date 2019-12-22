<template>
  <v-sheet color="grey lighten-5">
    <v-list flat nav dense class="grey lighten-5" v-if="IS_CATEGORY_LOADED">
      <v-subheader class="pa-2 secondarytext--text subtitle-1">
        КАТЕГОРИИ
      </v-subheader>
      <v-divider></v-divider>

      <v-list-item
        class="pl-4 ma-0"
        :ripple="false"
        @click="$emit('clickCategory', null)"
      >
        <v-list-item-content>
          <v-list-item-title
            class="body-2"
            :class="
              selectedCategory == null ? 'accent--text' : 'secondarytext--text'
            "
          >
            Все проекты
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-for="(category, index) in CATEGORY"
        :ripple="false"
        @click="$emit('clickCategory', category.id)"
        :key="'category_' + index"
        class="pl-4"
      >
        <v-list-item-content>
          <v-list-item-title
            class="body-2"
            :class="
              selectedCategory == category.id
                ? 'accent--text'
                : 'secondarytext--text'
            "
          >
            {{ category.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-subheader class="pa-2 secondarytext--text subtitle-1"
        >ТИП ПРОЕКТА</v-subheader
      >
      <v-divider></v-divider>

      <v-list-item
        class="pl-4 ma-0"
        :ripple="false"
        @click="$emit('clickType', null)"
      >
        <v-list-item-content>
          <v-list-item-title
            class="body-2"
            :class="
              selectedType == null ? 'accent--text' : 'secondarytext--text'
            "
          >
            Любой
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-for="(type, index) in PROJECT_TYPE"
        :key="'type_' + index"
        class="pl-4"
        :ripple="false"
        @click="$emit('clickType', type.id)"
      >
        <v-list-item-content>
          <v-list-item-title
            class="body-2"
            :class="
              selectedType == type.id ? 'accent--text' : 'secondarytext--text'
            "
          >
            {{ type.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-content>
          <div class="secondarytext--text">Только активные</div>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            inset
            :ripple="false"
            v-model="onlyOpen"
            :input-value="selectedOnlyOpen"
          />
        </v-list-item-action>
      </v-list-item>

      <v-list-item class="pa-0 ma-0" :ripple="false">
        <v-list-item-content>
          <v-btn
            color="secondary"
            to="/explore"
            tile
            min-width="100"
            large
            :disabled="!(selectedType || selectedCategory)"
          >
            Сбросить фильтры
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<style scoped></style>

<script>
import { mapGetters } from "vuex";
import { PROJECT_TYPE_REQUEST } from "../../store/actions/projectType";
import { CATEGORY_REQUEST } from "../../store/actions/category";

export default {
  name: "Filters",
  created() {
    if (!this.IS_CATEGORY_LOADED) {
      this.$store.dispatch(CATEGORY_REQUEST);
    }
    if (!this.IS_PROJECT_TYPE_LOADED) {
      this.$store.dispatch(PROJECT_TYPE_REQUEST);
    }
  },
  computed: {
    ...mapGetters([
      "IS_CATEGORY_LOADED",
      "IS_PROJECT_TYPE_LOADED",
      "CATEGORY",
      "PROJECT_TYPE"
    ])
  },
  watch: {
    onlyOpen() {
      this.$emit("clickOpen", this.onlyOpen);
    }
  },
  data() {
    return {
      onlyOpen: this.selectedOnlyOpen
    };
  },
  props: {
    selectedCategory: String,
    selectedType: String,
    selectedOnlyOpen: Boolean
  }
};
</script>

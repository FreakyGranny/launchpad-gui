<template>
  <tiptap-vuetify />
</template>

<style></style>

<script>
import moment from "moment";
import "moment/locale/ru";
import { mapGetters } from "vuex";
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  HorizontalRule,
  History
} from "tiptap-vuetify";
import { CATEGORY_REQUEST } from "../../store/actions/category";

export default {
  name: "ProjectFields",
  components: {
    TiptapVuetify
  },
  created() {
    if (!this.IS_CATEGORY_LOADED) {
      this.$store.dispatch(CATEGORY_REQUEST);
    }
  },
  computed: {
    ...mapGetters(["IS_CATEGORY_LOADED", "CATEGORY"]),
    categoryArray() {
      return Object.values(this.CATEGORY);
    },
    minAllowedDate() {
      return moment()
        .add(1, "day")
        .format("YYYY-MM-DD");
    },
    maxAllowedDate() {
      return moment()
        .add(1, "month")
        .format("YYYY-MM-DD");
    },
    instructionPlaceholder() {
      if (this.type.goal_by_amount) {
        return "Напиши тут как перевести тебе средства, по номеру телефона, карты или ты собираешь наличными.";
      } else {
        return "Добавь сюда дополнительную информацию, которую получат участники события в случае успеха.";
      }
    }
  },
  methods: {
    checkLink(value) {
      if (value === null) {
        return true;
      }
      if (!value.includes("https://")) {
        return "Ссылка должна начинаться с https";
      }
      if (value.length < 15) {
        return "Слишком короткая ссылка";
      }
      return true;
    },
    checkInstructions(instruction) {
      if (instruction.length < 10) {
        this.instructionInvalid = true;
        return "Это поле надо заполнить, его получат участники в письме.";
      }
      if (instruction.length > 500) {
        this.instructionInvalid = true;
        return "Ой, перебор. Надо покороче.";
      }
      this.instructionInvalid = false;
    },
    checkDescription(description) {
      if (description.length < 50) {
        this.descriptionInvalid = true;
        return "Слишком короткое описание. Потенциальным участникам может быть не понятна суть проекта.";
      }
      if (description.length > 1000) {
        this.descriptionInvalid = true;
        return "Не хочется тебя огорчать, но превышено максимальное количество символов.";
      }
      this.descriptionInvalid = false;
    },
    checkRichFields(instruction, description) {
      this.checkInstructions(instruction);
      this.checkDescription(description);
      return this.instructionInvalid || this.descriptionInvalid;
    }
  },
  data: () => ({
    instructionInvalid: false,
    descriptionInvalid: false,
    instruction_extensions: [
      Bold,
      Italic,
      Link,
      BulletList,
      OrderedList,
      ListItem,
      History
    ],
    extensions: [
      Bold,
      Italic,
      Link,
      BulletList,
      OrderedList,
      ListItem,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3]
          }
        }
      ],
      HorizontalRule,
      History
    ],
    rules: {
      required: value => !!value || "Поле обязательное",
      minPeople: value => value > 2 || "Грустновато будет, нет?",
      minAmount: value => value >= 100 || "Маловато будет"
    }
  }),
  props: {
    type: Object
  }
};
</script>

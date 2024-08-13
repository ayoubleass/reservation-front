export const visibilityMixin = {
  mounted() {
    setTimeout(() => {
      this.visible = true;
    }, 900);
  },
};

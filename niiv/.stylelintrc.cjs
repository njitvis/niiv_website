module.exports = {
  extends: ["stylelint-config-recommended"],
  rules: {
    // Allow Tailwind's special at-rules used in CSS entry files
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": ["tailwind", "apply", "variants", "responsive", "screen", "layer"]
    }],
  },
};

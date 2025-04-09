const styles = {
  container: {
    fontFamily: "'Inter', sans-serif",
    padding: "10px",
    maxWidth: "800px",
    margin: "0 auto"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },
  overlay: {
    padding: "10px",
    maxWidth: "800px",
    margin: "0 auto"
  },
  overlay: {
    padding: "10px",
    maxWidth: "800px",
    margin: "0 auto"
  },

  closeBtn: {
    position: "absolute",
    top: "15px",
    right: "15px",
    border: "none",
    background: "none",
    fontSize: "22px",
    cursor: "pointer",
    color: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: "500",
    fontSize: "28px",
    letterSpacing: "0",
    lineHeight: "1.5em",
    paddingBottom: "15px",
    position: "relative",
    display: "inline-block",
    color: "#5b2c6f",
    marginBottom: "18px",
  },
  headingUnderline: {
    content: '""',
    position: "absolute",
    left: "0",
    bottom: "0",
    height: "5px",
    width: "55px",
    backgroundColor: "#5b2c6f",
  },
  headingThinLine: {
    content: '""',
    position: "absolute",
    left: "0",
    bottom: "2px",
    height: "1px",
    width: "95%",
    maxWidth: "255px",
    backgroundColor: "#5b2c6f",
  },
  closeBtn: {
    position: "absolute",
    top: "15px",
    right: "15px",
    border: "none",
    background: "none",
    fontSize: "22px",
    cursor: "pointer",
    color: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: "500",
    fontSize: "28px",
    letterSpacing: "0",
    lineHeight: "1.5em",
    paddingBottom: "15px",
    position: "relative",
    display: "inline-block",
    color: "#5b2c6f",
    marginBottom: "18px",
  },
  headingUnderline: {
    content: '""',
    position: "absolute",
    left: "0",
    bottom: "0",
    height: "5px",
    width: "55px",
    backgroundColor: "#5b2c6f",
  },
  headingThinLine: {
    content: '""',
    position: "absolute",
    left: "0",
    bottom: "2px",
    height: "1px",
    width: "95%",
    maxWidth: "255px",
    backgroundColor: "#5b2c6f",
  },

  fieldContainer: {
    marginBottom: "16px"
  },
  fieldContainers: {
    marginBottom: "16px"
  },
  inputWrapper: {
    position: "relative",
    borderRadius: "8px",
    border: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    transition: "all 0.3s ease"
  },
  inputWrapperFocused: {
    borderColor: "#F2775E"
  },
  inputIcon: {
    marginLeft: "12px",
    color: "#666",
    display: "flex",
    alignItems: "center"
  },
  inputIconFocused: {
    color: "#F2775E"
  },
  inputField: {
    width: "100%",
    padding: "10px 12px 6px 12px",
    fontSize: "12px",
    border: "none",
    backgroundColor: "transparent",
    outline: "none",
    borderRadius: "8px"
  },
  inputLabel: {
    position: "absolute",
    left: "40px",
    top: "10px",
    fontSize: "12px",
    color: "#666",
    backgroundColor: "#f9f9f9",
    padding: "0 4px",
    transition: "all 0.3s ease",
    pointerEvents: "none"
  },
  inputLabels: {
    position: "absolute",
    left: "40px",
    top: "10px",
    fontSize: "12px",
    color: "#666",
    backgroundColor: "#f9f9f9",
    padding: "0 4px",
    transition: "all 0.3s ease",
    marginLeft: "-30px",
    pointerEvents: "none"
  },
  inputLabelFloated: {
    top: "-8px",
    fontSize: "12px",
    color: "#F2775E"
  },
  errorMessage: {
    color: "#e53935",
    fontSize: "13px",
    marginTop: "6px"
  },
  skillsetRow: {
    gap: "10px",
    marginBottom: "16px",
    alignItems: "flex-start"
  },
  skillsetField: {
    flex: 2
  },
  resourcesRow: {
    display: "flex",
    gap: "10px",
    // marginBottom: "16px",
    alignItems: "center"
  },
  resourcesField: {
    flex: 2,
    marginTop: "15px"
  },
  otherSkillsetField: {
    flex: 2,
    marginTop: "10px"
  },
  otherSkillsetInput: {
    display: "flex",
    alignItems: "center"
  },
  otherSkillsetIcon: {
    marginRight: "10px",
    color: "#666"
  },
  otherSkillsetText: {
    width: "100%",
    padding: "7px 15px",
    fontSize: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#f9f9f9"
  },
  otherModelField: {
    marginTop: "10px",
    marginBottom: "20px"
  },
  removeButton: {
    background: "none",
    border: "none",
    color: "#f44336",
    cursor: "pointer",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    gap: 1
  },
  addMoreButton: {
    display: "flex",
    alignItems: "center",
    background: "rgba(61, 61, 231, 0.74)",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "10px",
    gap: "8px",
    marginTop: "10px",
    marginBottom: "10px"
  },
  submitButton: {
    background: "#F2775E",
    color: "white",
    padding: "0.35em 1.2em",
    fontSize: "17px",
    fontWeight: "500",
    borderRadius: "0.9em",
    border: "none",
    letterSpacing: "0.05em",
    display: "flex",
    alignItems: "center",
    boxShadow: "inset 0 0 1.6em -0.6em #F2775E",
    overflow: "hidden",
    position: "relative",
    height: "2.8em",
    paddingRight: "3.3em",
    cursor: "pointer",
    transition: "transform 0.2s ease, opacity 0.2s ease",
    opacity: "1",
    marginTop: "24px",
    alignSelf: "flex-end"
  },
  submitButtonDisabled: {
    opacity: "0.8",
    cursor: "default"
  },
  submitIcon: {
    background: "white",
    marginLeft: "1em",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "2.2em",
    width: "2.2em",
    borderRadius: "50%",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    right: "0.3em",
    transition: "all 0.3s"
  },
  selectWrapper: {
    position: "relative",
    width: "100%"
  },
  selectArrow: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#666",
    pointerEvents: "none"
  },
  selectArrowFocused: {
    color: "#F2775E"
  },
  otherCourseField: {
    marginTop: "10px"
  },
  textareaWrapper: {
    position: "relative",
    width: "100%"
  },
  textareaField: {
    width: "100%",
    padding: "20px 12px 6px 12px",
    fontSize: "15px",
    border: "none",
    backgroundColor: "transparent",
    outline: "none",
    borderRadius: "8px",
    resize: "vertical",
    minHeight: "120px"
  },
  textareaIcon: {
    marginLeft: "12px",
    marginTop: "12px",
    color: "#666",
    display: "flex",
    alignItems: "center"
  },
  textareaIconFocused: {
    color: "#F2775E"
  },
  traineeModelContainer: {
    marginBottom: "5px"
  }
};

export { styles };
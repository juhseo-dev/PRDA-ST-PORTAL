
/* PRDA S&T 정비사례 MASTER DB */

const PRDA_CASES = [];

function validatePRDACase(item) {
  if (!item || typeof item !== "object") {
    return false;
  }

  if (!/^PCV-\d{4,}$/.test(item.id || "")) {
    return false;
  }

  if (!item.manufacturer || !item.symptom) {
    return false;
  }

  return item.publicApproved === true;
}

function getPublicPRDACases() {
  return PRDA_CASES.filter(validatePRDACase);
}

function findPRDACases(keyword) {
  const query = String(keyword || "")
    .trim()
    .toLowerCase();

  return getPublicPRDACases().filter(function(item) {
    const searchable = [
      item.id,
      item.manufacturer,
      item.model,
      item.pilot,
      item.equipmentType,
      item.symptom,
      item.confirmedCause,
      item.inspection,
      item.action,
      item.result
    ].join(" ").toLowerCase();

    return searchable.includes(query);
  });
}

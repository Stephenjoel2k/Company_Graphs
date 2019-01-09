const fs = require("fs");

const GetJson = path => {
  var json = JSON.parse(fs.readFileSync(path).toString());
  const result = Object.keys(json).map(key => json[key]);
  return result;
};

const SumCount = (Datas, x, y) => {
  let counter_object = {};
  Datas.forEach(Data => {
    let type = Data[y];
    let total = Data[x];
    let existingTotal;
    let counter;
    if (counter_object[type]) {
      existingTotal = counter_object[type];
    } else {
      existingTotal = 0;
    }
    counter = total + existingTotal;
    counter_object[type] = counter;
  });
  return counter_object;
};

const GetTotal = data => {
  let total = 0;
  for (var key in data) {
    total += data[key];
  }
  data["total"] = total;
};

const Connect = (achievements, transaction_types) => {
  achievements.forEach(achievement => {
    transaction_types.forEach(transaction_type => {
      if (
        transaction_type.sk_transaction_type_id ==
        achievement.sk_transaction_type_id
      ) {
        achievement["Group"] = transaction_type.Group;
      }
    });
  });
};

const AttachLabels = (targets, achievements) => {
  const labels = [];
  for (var key_t in targets) {
    for (var key_a in achievements) {
      if (key_a == key_t) {
        let object = {
          target: targets[key_t],
          achievement: achievements[key_a]
        };
        labels.push(key_a, object);
      }
    }
  }
  return labels;
};

const DateFilter = () => {};

const GetData = () => {
  const target = GetJson("./Sample_Data/team.json");
  const achievement = GetJson("./Sample_Data/actual.json");
  const transaction_type = GetJson("./Sample_Data/transaction_type.json");
  const data_targets = SumCount(target, "targets", "type");
  Connect(achievement, transaction_type);
  const data_achievements = SumCount(achievement, "booking_usd", "Group");
  GetTotal(data_targets);
  GetTotal(data_achievements);
  const labels = AttachLabels(data_targets, data_achievements);
  console.log(labels);
  return { labels };
};

GetData();

module.exports = { GetData };

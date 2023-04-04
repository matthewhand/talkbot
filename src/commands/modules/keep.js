/*jshint esversion: 9 */

const Command = require("@models/Command"),
  botStuff = require("@helpers/bot-stuff");

class Keep extends Command {
  // core COMMAND getters
  get group() {
    return "server";
  }
  get hidden() {
    return false;
  }

  static addMessageToQueue(server, message) {
    let count = server.getSettingObjectValue("keepMessages", "count");
    if (count == null || !Number.isInteger(+count)) {
      return;
    }

    let queue = server.getSettingObjectValue("keepMessages", "keepQueue") || [];
    queue.push(message);
    server.addSettings("keepMessages", { keepQueue: queue });
  }

  static cleanup(server, message) {
    let count = server.getSettingObjectValue("keepMessages", "count");

    if (!count || !Number.isInteger(+count)) {
      return;
    }

    let queue = server.getSettingObjectValue("keepMessages", "keepQueue") || [];

    if (queue.length > +count) {
      let removes = queue.splice(0, queue.length - +count);
      // for (const item of removes) {
      //   item.delete();
      // }
      message.channel.bulkDelete(removes);
    }

    server.addSettings("keepMessages", { keepQueue: queue });
  }

  execute({ input }) {
    const server = input.server;

    if (!input.args.length) {
      let count =
        server.getSettingObjectValue("keepMessages", "count") || "all";
      input.il8nResponse("keep.usage");
      if (count == "all") input.il8nResponse("keep.keepAll");
      else input.il8nResponse("keep.keepCount", { count });
      return;
    }

    if (!input.ownerCanManageTheServer())
      return input.il8nResponse("keep.nope");

    if (!botStuff.botHasManageMessagePermissions(server))
      return input.il8nResponse("keep.msgpermissions");

    if (/^(all)/i.test(input.args[0])) {
      server.addSettings("keepMessages", { count: null });
      return input.il8nResponse("keep.all");
    }

    if (/^(\d+)$/i.test(input.args[0])) {
      server.addSettings("keepMessages", { count: input.args[0] });
      return input.il8nResponse("keep.keepCount", { count: input.args[0] });
    }
  }

  onMessage({ message, server }) {
    Keep.addMessageToQueue(server, message);
  }

  onMessageDelivered({ message, server }) {
    Keep.cleanup(server, message);
  }
}

// registration
exports.register = (commands) => {
  commands.add(Keep.command);
};

exports.unRegister = (commands) => {
  commands.remove(Keep.command);
};

exports.class = Keep;

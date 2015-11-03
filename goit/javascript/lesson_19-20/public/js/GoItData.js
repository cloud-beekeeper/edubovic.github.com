var GoItData = (function () {
    function GoItData(data) {
        this.data = data;
    }

    GoItData.prototype.getSkills = function () {
        var listSkills = [];
        _(this.data).forEach(function(user) {
            user.skills.forEach(function (skill) {
                listSkills.push(skill);
            });
        });

        return _.sortBy(_.uniq(listSkills), function (skill) {
            return skill.toLowerCase();
        });
    };

    GoItData.prototype.getNamesOrderByCountFriends = function () {
        var listUsers = [];

        _(this.data).forEach(function(user) {
            listUsers.push({
                name: user.name,
                countFriends: user.friends.length
            });
        });

        return _.map(_.orderBy(listUsers, ['countFriends'], ['asc']), function (user) {
            return user.name;
        });
    };
    GoItData.prototype.getFriendsAllUsers = function () {
        var listFriends = [];
        _(this.data).forEach(function(user) {
            user.friends.forEach(function (friend) {
                listFriends.push(friend.name);
            });
        });

        return _.uniq(listFriends);
    };

    return GoItData;
})();

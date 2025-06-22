import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

const LeaderboardScreen: React.FC = () => {
  const leaderboard = [
    { id: '1', username: 'CodeMaster', level: 15, xp: 12850, rank: 1 },
    { id: '2', username: 'ReactNinja', level: 14, xp: 11200, rank: 2 },
    { id: '3', username: 'JSExpert', level: 13, xp: 10750, rank: 3 },
    { id: '4', username: 'DevGuru', level: 12, xp: 9800, rank: 4 },
    { id: '5', username: 'TechSavvy', level: 11, xp: 8900, rank: 5 },
    { id: '6', username: 'You', level: 8, xp: 6420, rank: 12 },
  ];

  const getRankStyle = (rank: number) => {
    if (rank === 1) return styles.goldRank;
    if (rank === 2) return styles.silverRank;
    if (rank === 3) return styles.bronzeRank;
    return styles.defaultRank;
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <Text style={styles.subtitle}>See how you rank against other learners</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.topThree}>
          {leaderboard.slice(0, 3).map((user, index) => (
            <View key={user.id} style={[styles.podiumCard, index === 0 && styles.firstPlace]}>
              <Text style={styles.podiumRank}>{getRankIcon(user.rank)}</Text>
              <Text style={styles.podiumUsername}>{user.username}</Text>
              <Text style={styles.podiumLevel}>Level {user.level}</Text>
              <Text style={styles.podiumXp}>{user.xp.toLocaleString()} XP</Text>
            </View>
          ))}
        </View>

        <View style={styles.leaderboardList}>
          {leaderboard.map((user) => (
            <View 
              key={user.id} 
              style={[
                styles.leaderboardItem,
                user.username === 'You' && styles.currentUser
              ]}
            >
              <View style={styles.rankContainer}>
                <Text style={[styles.rankText, getRankStyle(user.rank)]}>
                  {getRankIcon(user.rank)}
                </Text>
              </View>
              
              <View style={styles.userInfo}>
                <Text style={[
                  styles.usernameText,
                  user.username === 'You' && styles.currentUserText
                ]}>
                  {user.username}
                </Text>
                <Text style={styles.levelText}>Level {user.level}</Text>
              </View>
              
              <Text style={styles.xpText}>{user.xp.toLocaleString()} XP</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  content: {
    padding: 24,
  },
  topThree: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  podiumCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  firstPlace: {
    backgroundColor: '#fef3c7',
    borderWidth: 2,
    borderColor: '#f59e0b',
  },
  podiumRank: {
    fontSize: 32,
    marginBottom: 8,
  },
  podiumUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  podiumLevel: {
    fontSize: 12,
    color: '#6366f1',
    marginBottom: 4,
  },
  podiumXp: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  leaderboardList: {
    gap: 8,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentUser: {
    backgroundColor: '#f0f9ff',
    borderWidth: 2,
    borderColor: '#0ea5e9',
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  goldRank: {
    color: '#f59e0b',
  },
  silverRank: {
    color: '#6b7280',
  },
  bronzeRank: {
    color: '#d97706',
  },
  defaultRank: {
    color: '#64748b',
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  usernameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  currentUserText: {
    color: '#0c4a6e',
  },
  levelText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  xpText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6366f1',
  },
});

export default LeaderboardScreen;

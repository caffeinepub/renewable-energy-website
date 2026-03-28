import Time "mo:core/Time";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";

actor {
  type QuizScore = {
    userId : Text;
    score : Nat;
    totalQuestions : Nat;
    timestamp : Time.Time;
  };

  module QuizScore {
    public func compare(quizScore1 : QuizScore, quizScore2 : QuizScore) : Order.Order {
      Text.compare(quizScore1.userId, quizScore2.userId);
    };
  };

  let quizScores = Map.empty<Text, QuizScore>();
  let pageVisits = Map.empty<Text, Nat>();

  public shared ({ caller }) func submitQuizScore(userId : Text, score : Nat, totalQuestions : Nat) : async () {
    let quizScore : QuizScore = {
      userId;
      score;
      totalQuestions;
      timestamp = Time.now();
    };
    quizScores.add(userId, quizScore);
  };

  public shared ({ caller }) func recordPageVisit(section : Text) : async () {
    let currentCount = switch (pageVisits.get(section)) {
      case (null) { 0 };
      case (?count) { count };
    };
    pageVisits.add(section, currentCount + 1);
  };

  public query ({ caller }) func getQuizScores() : async [QuizScore] {
    quizScores.values().toArray().sort();
  };

  public query ({ caller }) func getPageVisits() : async [(Text, Nat)] {
    pageVisits.entries().toArray();
  };
};

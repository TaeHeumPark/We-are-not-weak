package com.ssafy.cartel.service;

import com.ssafy.cartel.domain.Article;
import com.ssafy.cartel.domain.Comment;
import com.ssafy.cartel.domain.User;
import com.ssafy.cartel.dto.CommentDto;
import com.ssafy.cartel.repository.ArticleRepository;
import com.ssafy.cartel.repository.CommentRepository;
import com.ssafy.cartel.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;

    @Transactional
    public Comment save(CommentDto commentDto){

        User user = userRepository.findById(commentDto.getUserId())
                .orElseThrow(()-> new IllegalArgumentException("not found user_id" ));
        Article article = articleRepository.findById(commentDto.getPostId())
                .orElseThrow(()->new IllegalArgumentException("nor found post_id"));
        Comment comment = commentDto.toEntity(user,article);

        user.point(2);
        return commentRepository.save(comment);

    }

    public List<Comment> getComments(Integer id){//post id
        Article article = articleRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("not found post_id"));
        List<Comment> comments = commentRepository.findAllByArticle(article);
        return comments;
    }

    public List<Comment> getUserComments(Integer id){//user id
        User user = userRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("not found post_id"));
        List<Comment> comments = commentRepository.findAllByUser(user);
        return comments;
    }

    public void delete(Integer id){
        commentRepository.deleteById(id);
    }



}


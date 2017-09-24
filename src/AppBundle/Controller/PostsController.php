<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Post;
use AppBundle\Form\PostType;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;

class PostsController extends FOSRestController
{
    public function getPostsAction()
    {
        $posts = $this->getDoctrine()->getRepository("AppBundle:Post")->findAllPostsOrderById();

        $view = $this->view($posts, 200);

        return $this->handleView($view);
    }

    public function postPostsAction(Request $request)
    {
        $form = $this->createForm(PostType::class);

        $form->submit([
            'name' => $request->request->get('name'),
            'description' => $request->request->get('description'),
        ]);

        if($form->isValid() && $form->isSubmitted()) {
            $post = $form->getData();
            $em = $this->getDoctrine()->getManager();
            $em->persist($post);
            $em->flush($post);
        }

        $view = $this->view(['form' => $form]);

        return $this->handleView($view);
    }
}